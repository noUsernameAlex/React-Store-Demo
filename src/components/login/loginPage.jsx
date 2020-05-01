import React ,{ Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button, Form, Card} from 'react-bootstrap';


import Login from "./login.component";
import SignUp from "./signup.component";
import LoginStyle from './loginStyle.css';
import axios from 'axios';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email : null,
      password : null,
      name : null,
    };
  }
  componentDidMount() {
    // axios.get(`localhost:5000/user`)
    //   .then(res => {
    //     this.setState({name : res.data });
    //   })
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
  handleSubmit = (event) => {
    //alert(`email is ${this.state.email} and password is ${this.state.password}`);
    event.preventDefault();
    let person = {
      email : this.state.email,
      password : this.state.password,
    };
    axios.post('http://localhost:5000/user/', person)
    .then(res => {
        if (res) {
            sessionStorage.setItem('isLoggedIn', true);
        }
        alert(`logged in! ${sessionStorage.getItem('isLoggedIn')}`);
    })
    .catch(error => alert("username or password incorrect!"));
  }

  render() {
    return (
      <div className='login-box'>

        <Form className='login-form' onSubmit={this.handleSubmit}>
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
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
