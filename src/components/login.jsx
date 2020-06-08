import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import authService from "../services/authService";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: { email: "", password: "" },
      errors: {},
      errMsg: "",
    };
  }

  render() {
    return (
      <React.Fragment>
        <h1>Login</h1>

        {this.state.errMsg && <Alert variant='danger'>{this.state.errMsg}</Alert>}

        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId='username'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name='email'
              value={this.state.account.email}
              onChange={this.handleChange}
              placeholder='Enter email'
            />
            {this.state.errors.email && (
              <Form.Text className='text-danger'>{this.state.errors.email}</Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              value={this.state.account.password}
              onChange={this.handleChange}
              placeholder='Enter password'
            />
            {this.state.errors.password && (
              <Form.Text className='text-danger'>{this.state.errors.password}</Form.Text>
            )}
          </Form.Group>

          <Button type='submit'>Login</Button>
        </Form>
      </React.Fragment>
    );
  }

  handleChange = (event) => {
    const account = this.state.account;
    account[event.currentTarget.name] = event.currentTarget.value;
    this.setState({ account });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    let errors = this.validateForm();
    this.setState({ errors });

    if (errors) {
      console.log("Erros", errors);
      return;
    } else {
      errors = {};
      this.setState({ errors });
    }

    try {
      const { email, password } = this.state.account;
      await authService.login(email, password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errMsg = ex.response.data.message;
        this.setState({ errMsg });
      }
    }
  };

  validateForm = () => {
    const account = this.state.account;
    const errors = {};

    if (account.email === "") errors.email = "Email is required";
    if (account.password === "") errors.password = "Password is required";

    if (Object.keys(errors).length === 0) {
      return null;
    } else {
      return errors;
    }
  };
}

export default LoginForm;
