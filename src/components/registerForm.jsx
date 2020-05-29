import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: { username: "", password: "" },
      errors: {},
    };
  }

  render() {
    return (
      <React.Fragment>
        <h1>Register</h1>
        <Form onSubmit={this.handleRegister}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              value={this.state.account.username}
              onChange={this.handleChange}
              placeholder="Enter username"
            />
            {this.state.errors.username && (
              <Form.Text className="text-danger">{this.state.errors.username}</Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={this.state.account.password}
              onChange={this.handleChange}
              placeholder="Enter password"
            />
            {this.state.errors.password && (
              <Form.Text className="text-danger">{this.state.errors.password}</Form.Text>
            )}
          </Form.Group>
          <Button type="submit">Register</Button>
        </Form>
      </React.Fragment>
    );
  }

  handleChange = (event) => {
    const account = this.state.account;
    account[event.currentTarget.name] = event.currentTarget.value;
    this.setState({ account });
  };

  handleRegister = (event) => {
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

    const account = this.state.account;
    console.log("New account submitted", account);
  };

  validateForm = () => {
    const account = this.state.account;
    const errors = {};

    if (account.username.trim() === "") errors.username = "Username is required";
    if (account.password.trim() === "") errors.password = "Password is required";

    if (Object.keys(errors).length === 0) {
      return null;
    } else {
      return errors;
    }
  };
}

export default RegisterForm;
