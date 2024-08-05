import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "../Image/logo.svg";
import Footer from "./Footer";
const First = () => {
  const appStyles = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundImage: "url('https://reactjs.org/logo-og.png')", // Replace with your image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
  };

  const mainContentStyles = {
    textAlign: 'center',
    paddingTop: '100px',
  };

  return (
    <div style={appStyles}>
      <Header />
      <MainContent styles={mainContentStyles} />
      <Footer />
    </div>
  );
};

const Header = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Container>
            <img
              alt=""
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            <span>&nbsp;</span>
      <Navbar.Brand href="#home">REACT JS</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Button variant="outline-success" className="mr-2" href="/login">Login</Button>
          <span>&nbsp;&nbsp; </span>
          <Button variant="outline-info" href="/signup">Signup</Button>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

const MainContent = ({ styles }) => (
  <Container style={styles}>
    <h1 style={{textAlign: "right", padding: "20px",borderRadius:"20px"}}>Welcome to My WebPage</h1>
    
  </Container>
);

// const Footer = () => (
//   <footer className="text-center mt-auto py-3">
//     <div className="container">
//       <span className="text-muted" style={{backgroundColor:'white'}}>© 2024 My WebPage</span>
//     </div>
//   </footer>
// );

export default First ;
