import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import {ButtonContainer} from './Button';
import styled from 'styled-components';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import {ProductConsumer} from '../context';

export default class MyNavbar extends Component {

  handleLogout = () => {
    sessionStorage.setItem('isLoggedIn', false);
    sessionStorage.setItem('email', null);
    window.location = '/';
  }

  render() {
    return (
      <ProductConsumer>
        {(value) => {
          const {handleLogout, email} = value;
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
                <Nav.Item>
                  {(sessionStorage.getItem('isLoggedIn') == true || sessionStorage.getItem('isLoggedIn') === "true") ?
                    <NavDropdown title={sessionStorage.getItem('email')} id="nav-dropdown">
                      <NavDropdown.Item href='/cart'>cart</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={this.handleLogout}>log out</NavDropdown.Item>
                    </NavDropdown> :
                    <Nav.Link href="login">login</Nav.Link>}

                </Nav.Item>
              </Navbar.Collapse>
            </Navbar>
          )
        }}
      </ProductConsumer>
    );
  }
}
