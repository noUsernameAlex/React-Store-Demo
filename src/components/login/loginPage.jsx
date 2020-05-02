import React ,{ Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button, Form, Card} from 'react-bootstrap';


import Login from "./login.component";
import SignUp from "./signup.component";
import LoginStyle from './loginStyle.css';
import axios from 'axios';
import {ProductConsumer} from '../../context';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
  }

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  }
  handlePasswordChange = (event) => {
    this.setState({
      password : event.target.value,
    });
  }


  aaa = (e) => {
    e.preventDefault();
  }


  render() {
    return (
      <ProductConsumer>
        {value => {
          return (
            <div className='login-box'>

              <Form className='login-form' onSubmit={this.aaa}>
                <p className='row login-title'>Log in</p>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" onChange={this.handleEmailChange}/>
                  <Form.Text className="text-muted">
                    hare your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={this.handlePasswordChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicSignUpOption">
                  <Form.Text className="text-muted">
                    haven't registered? <Link to='signUp'>Sign up here</Link>
                  </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={() => {
                  value.handleLoginSubmit(this.state.email, this.state.password);
                }}>
                  Submit
                </Button>
              </Form>
            </div>
          )
        }}

      </ProductConsumer>
    );
  }
}
