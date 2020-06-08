import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import authService from '../services/authService';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: { email: '', password: '', matchingPassword: '' },
      errors: {},
      errMsg: '',
    };
  }

  render() {
    const { email, password, matchingPassword } = this.state.account;

    return (
      <React.Fragment>
        <h1>Register</h1>

        {this.state.errMsg && <Alert variant='danger'>{this.state.errMsg}</Alert>}

        <Form onSubmit={this.handleRegister}>
          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name='email'
              value={email}
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
              value={password}
              onChange={this.handleChange}
              placeholder='Enter password'
            />
            {this.state.errors.password && (
              <Form.Text className='text-danger'>{this.state.errors.password}</Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId='matchingPassword'>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type='password'
              name='matchingPassword'
              value={matchingPassword}
              onChange={this.handleChange}
              placeholder='Enter password'
            />
            {this.state.errors.matchingPassword && (
              <Form.Text className='text-danger'>{this.state.errors.matchingPassword}</Form.Text>
            )}
          </Form.Group>

          <Button type='submit'>Register</Button>
        </Form>
      </React.Fragment>
    );
  }

  handleChange = (event) => {
    const account = this.state.account;
    account[event.currentTarget.name] = event.currentTarget.value.trim();
    this.setState({ account });
  };

  handleRegister = async (event) => {
    event.preventDefault();

    let errors = this.validateForm();
    this.setState({ errors });

    if (errors) {
      console.log('Erros', errors);
      return;
    } else {
      errors = {};
      this.setState({ errors });
    }

    try {
      const { email, password, matchingPassword } = this.state.account;
      await authService.register(email, password, matchingPassword);
      window.location = '/';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errMsg = ex.response.data.message;
        this.setState({ errMsg });
      }
    }
  };

  validateForm = () => {
    const { email, password, matchingPassword } = this.state.account;
    const errors = {};

    if (email === '') errors.email = 'Email is required';
    if (password === '') errors.password = 'Password is required';
    if (matchingPassword === '') errors.matchingPassword = 'Password is required';
    if (matchingPassword !== password) errors.matchingPassword = "Passwords don't match";

    if (Object.keys(errors).length === 0) {
      return null;
    } else {
      return errors;
    }
  };
}

export default RegisterForm;
