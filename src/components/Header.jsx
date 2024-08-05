import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../Image/logo.svg";
import { Link } from "react-router-dom";
import axios from "axios";

export const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/user/me", {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        console.log("User not logged in");
      }
    };
    checkUser();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.classList.toggle("sidebar-open", !isSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/v1/user/logout", {}, {
        withCredentials: true,
      });
      setUser(null);
      alert("Logout successful!");
      navigate("/login");
    } catch (error) {
      console.error("There was an error logging out!", error);
      alert("There was an error logging out!");
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Button
          variant="dark"
          onClick={toggleSidebar}
          style={{ marginLeft: "15px", zIndex: 1 }}
        >
          ☰
        </Button>
        <Container fluid>
          <Navbar.Brand className="ms-2">
            <img
              alt=""
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            REACT JS
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {/* Other Nav Links */}
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              {user ? (
                <>
                  <span style={{ marginRight: "10px" }}>{user.name}</span>
                  <Button variant="danger" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="success">Login</Button>
                  </Link>
                  <span>&nbsp;</span>
                  <Link to="/signup">
                    <Button variant="primary">Signup</Button>
                  </Link>
                </>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "250px",
          height: "100%",
          background: "#343a40",
          color: "#fff",
          boxShadow: "2px 0 5px rgba(0,0,0,0.3)",
          transform: isSidebarOpen ? "translateX(0)" : "translateX(-250px)",
          transition: "transform 0.3s ease",
          padding: "50px",
          overflowY: "auto",
        }}
        className="sidebar"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Button variant="primary" href="/">Home</Button>
          <Button variant="secondary">About us</Button>
          <Button variant="success">Contact</Button>
        </div>
      </div>
      <style>{`
        body.sidebar-open .main-content {
          margin-left: 250px;
          transition: margin-left 0.3s ease;
        }
      `}</style>
    </>
  );
};

export default Header;
