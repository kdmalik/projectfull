import React, { useState, useReducer } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import Header from './Header';
import registerReducer from "../middleware/reducer";
import axios from 'axios';

const Signup = () => {
  const [user, dispatch] = useReducer(registerReducer, []);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const emailExists = user.some((u) => u.email === email);
    if (emailExists) {
      alert('Email is already registered.');
      return;
    }
    const newItem = { name, email, password, phoneNumber };
    dispatch({ type: 'ADD_USER', payload: newItem });

    try {
      const response = await axios.post('http://localhost:8000/api/v1/user/register', newItem, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('User registered successfully:', response.data);
      alert('User added successfully!');
    } catch (error) {
      console.error('There was an error registering the user!', error);
      alert('There was an error registering the user!');
    }

    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setPhoneNumber('');
  };

  return (
    <>
      <Header />
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h2 className="mb-4 text-center">Signup</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mt-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formConfirmPassword" className="mt-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPhone" className="mt-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3 w-100">
                Signup
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Signup;
