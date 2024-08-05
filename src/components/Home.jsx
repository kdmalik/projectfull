import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Footer } from "./Footer";
import { Container, Table, Button, Form, Pagination } from "react-bootstrap";
import axiosInstance from '../api/axiosInstance.js';

export const Home = () => {
  const [users, setUsers] = useState([]);
  const [customData, setCustomData] = useState([]);
  const [newData, setNewData] = useState("");
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState("");

  useEffect(() => {
    fetchCustomData();
  }, []);

  const fetchCustomData = async () => {
    try {
      const response = await axiosInstance.get(`/customData/${'66af5bf69f942c04643fec54'}`);
      setCustomData(response.data);
    } catch (error) {
      console.error("Error fetching custom data", error);
    }
  };

  const handleAddData = async () => {
    try {
      const response = await axiosInstance.post('/customData/add', { userId:"66af5bf69f942c04643fec54", data: newData });
      setCustomData([...customData, response.data.customData]);
      setNewData("");
    } catch (error) {
      console.error("Error adding custom data", error);
    }
  };

  const handleEditData = async (id) => {
    try {
      const response = await axiosInstance.put(`/customData/${id}`, { data: editData });
      setCustomData(customData.map(data => data._id === id ? response.data.updatedData : data));
      setEditId(null);
      setEditData("");
    } catch (error) {
      console.error("Error editing custom data", error);
    }
  };

  const handleDeleteData = async (id) => {
    try {
      await axiosInstance.delete(`/customData/${id}`);
      setCustomData(customData.filter(data => data._id !== id));
    } catch (error) {
      console.error("Error deleting custom data", error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Container className="flex-grow-1 my-4 main-content">
        <h1 style={{ textAlign: "center", padding: "20px" }}>
          Welcome to My WebPage
        </h1>
        <Form.Group controlId="newData" className="mb-3" style={{ display: "flex", justifyContent: 'flex-start', gap: '10px', margin: '5px' }}>
          <Form.Control
            type="text"
            placeholder="Enter new data"
            value={newData}
            onChange={(e) => setNewData(e.target.value)}
            style={{ width: '70%', backgroundColor: '#f8f9fa', color: '#343a40', border: '1px solid #adb5bd' }}
          />
          <Button variant="success" onClick={handleAddData}>Add Data</Button>
        </Form.Group>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Custom Data</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customData.map((data, index) => (
              <tr key={data._id}>
                <td>{index + 1}</td>
                <td>
                  {editId === data._id ? (
                    <Form.Control
                      type="text"
                      value={editData}
                      onChange={(e) => setEditData(e.target.value)}
                      style={{ backgroundColor: "lightblue" }}
                    />
                  ) : (
                    data.data
                  )}
                </td>
                <td>
                  {editId === data._id ? (
                    <>
                      <Button
                        variant="success"
                        onClick={() => handleEditData(data._id)}
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
                        onClick={() => {
                          setEditId(data._id);
                          setEditData(data.data);
                        }}
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteData(data._id)}
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
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
