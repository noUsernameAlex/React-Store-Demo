import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import {ButtonContainer} from './Button';
import styled from 'styled-components';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

export default class MyNavbar extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">store</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          {/* mr-auto can push other elements to the right*/}
            <Nav.Link href="/">product</Nav.Link>
            <Nav.Link href="sample">sample</Nav.Link>

          </Nav>
          <Nav.Link href="cart"><button className='cart-icon'>my cart</button></Nav.Link>
          <Nav.Link href="login">login</Nav.Link>
        </Navbar.Collapse>
        </Navbar>
    );
  }
}
