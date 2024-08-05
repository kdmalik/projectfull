import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Footer } from "./Footer";
import { Container, Table, Button, Form, Pagination } from "react-bootstrap";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export const Home = () => {
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchName,setSearchName]=useState("");
  const [searchPhone,setSearchPhone]=useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("register")) || [];
    setUsers(storedUsers);
  }, []);

  const handleDelete = (id) => {
    const newUsers = users.filter((user) => user.id !== id);
    setUsers(newUsers);
    localStorage.setItem("register", JSON.stringify(newUsers));
  };

  const handleDeleteSelected = () => {
    const newUsers = users.filter((user) => !selectedUsers.includes(user.id));
    setUsers(newUsers);
    setSelectedUsers([]);
    localStorage.setItem("register", JSON.stringify(newUsers));
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditPhone(user.phone);
  };

  const handleSave = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id
        ? { ...user, name: editName, email: editEmail, phone: editPhone }
        : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("register", JSON.stringify(updatedUsers));
    setEditId(null);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['#', 'UID', 'Name', 'Email', 'Phone']],
      body: users.map((user, index) => [
        index + 1,
        user.id,
        user.name,
        user.email,
        user.phone,
      ]),
    });
    doc.save('users.pdf');
  };

  const handleDownloadXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'users.xlsx');
  };

  const handleSelectUser = (id) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((userId) => userId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchName.toLowerCase()) &&
      user.email.toLowerCase().includes(searchEmail.toLowerCase())&&
      user.phone.toLowerCase().includes(searchPhone.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Container className="flex-grow-1 my-4 main-content">
        <h1 style={{ textAlign: "center", padding: "20px" }}>
          Welcome to My WebPage
        </h1>
        <Form.Group controlId="search" className="mb-3" style={{ display: "flex", justifyContent: 'flex-start', gap: '10px', margin: '5px' }}>
          
          <Form.Control
            type="text"
            placeholder="Search by name or email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            style={{ width: '30%', backgroundColor: '#f8f9fa', color: '#343a40', border: '1px solid #adb5bd' }}
          />
          <Form.Control
            type="text"
            placeholder="Search by name "
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            style={{ width: '30%', backgroundColor: '#f8f9fa', color: '#343a40', border: '1px solid #adb5bd' }}
          />
          <Form.Control
            type="text"
            placeholder="Search by phone "
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
            style={{ width: '30%', backgroundColor: '#f8f9fa', color: '#343a40', border: '1px solid #adb5bd' }}
          />
        </Form.Group>
        <div/>
        <div style={{ display: "flex", justifyContent: 'flex-start', gap: '10px', margin: '5px' }}>
          <Button variant="danger" onClick={handleDeleteSelected} className="justify-content-end">
            Delete 
          </Button>
          <Button variant="success" onClick={handleDownloadPDF}>Download PDF</Button>
          <Button variant="success" onClick={handleDownloadXLSX}>Download XLSX</Button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ backgroundColor: "lightgoldenrodyellow" }}>
                 <div>Select All</div>
                <Form.Check
                  type="checkbox" 
                  checked={selectedUsers.length === users.length}
                  onChange={handleSelectAll}
                />
                
              </th>
              <th style={{ backgroundColor: "lightgoldenrodyellow" }}>#</th>
              <th style={{ backgroundColor: "lightgoldenrodyellow" }}>UID</th>
              <th style={{ backgroundColor: "lightgoldenrodyellow" }}>Name</th>
              <th style={{ backgroundColor: "lightgoldenrodyellow" }}>Email</th>
              <th style={{ backgroundColor: "lightgoldenrodyellow" }}>Phone</th>
              <th style={{ backgroundColor: "lightgoldenrodyellow" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user.id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                  />
                </td>
                <td>{indexOfFirstUser + index + 1}</td>
                <td>{user.id}</td>
                <td>
                  {editId === user.id ? (
                    <Form.Control
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      style={{ backgroundColor: "lightblue" }}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editId === user.id ? (
                    <Form.Control
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      style={{ backgroundColor: "lightblue" }}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editId === user.id ? (
                    <Form.Control
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      style={{ backgroundColor: "lightblue" }}
                    />
                  ) : (
                    user.phone
                  )}
                </td>
                <td>
                  {editId === user.id ? (
                    <>
                      <Button
                        variant="success"
                        onClick={() => handleSave(user.id)}
                      >
                        Save
                      </Button>{" "}
                      <Button
                        variant="secondary"
                        onClick={() => setEditId(null)}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="warning"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination>
          {[...Array(totalPages).keys()].map((number) => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 === currentPage}
              onClick={() => paginate(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;