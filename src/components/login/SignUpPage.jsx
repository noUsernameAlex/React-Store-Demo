import React ,{ Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button, Form, Card} from 'react-bootstrap';


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
    axios.post('http://localhost:5000/user/add', person)
    .then(res => alert("congrats! user created!"))
    .catch(error => alert("this username is not available"));
  }

  render() {
    return (
      <div className='login-box'>

        <Form className='login-form' onSubmit={this.handleSubmit}>
          <p className='row login-title'>Sign up</p>
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
              have registered? <Link to='login'>login here</Link>
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
