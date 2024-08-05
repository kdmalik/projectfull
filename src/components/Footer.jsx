import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
  return (
    <Navbar bg="dark" variant="dark" className="mt-auto py-3">
      <Container className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <Nav className="mb-3 mb-md-0">
          <Nav.Link href="#home" className="text-white">Home</Nav.Link>
          <Nav.Link href="#about" className="text-white">About Us</Nav.Link>
          <Nav.Link href="#services" className="text-white">Services</Nav.Link>
          <Nav.Link href="#contact" className="text-white">Contact</Nav.Link>
        </Nav>
        <Nav className="mb-3 mb-md-0">
          <Nav.Link href="https://www.facebook.com" target="_blank" className="text-white">
            <FaFacebook />
          </Nav.Link>
          <Nav.Link href="https://www.twitter.com" target="_blank" className="text-white mx-3">
            <FaTwitter />
          </Nav.Link>
          <Nav.Link href="https://www.instagram.com" target="_blank" className="text-white">
            <FaInstagram />
          </Nav.Link>
          <Nav.Link href="https://www.linkedin.com" target="_blank" className="text-white mx-3">
            <FaLinkedin />
          </Nav.Link>
        </Nav>
        <div className="text-center text-white">
          <p className="mb-0">&copy; {new Date().getFullYear()} Your Company. All Rights Reserved.</p>
        </div>
      </Container>
    </Navbar>
  );
};

export default Footer;
