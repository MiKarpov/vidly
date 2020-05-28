import React from "react";
import Input from "./common/input";

class LoginForm extends React.Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleLogin}>
          <Input
            type="text"
            name="username"
            value={account.username}
            label="Username"
            errorMsg={errors.username}
            onChange={this.handleChange}
          />
          <Input
            type="password"
            name="password"
            value={account.password}
            label="Password"
            errorMsg={errors.password}
            onChange={this.handleChange}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  handleLogin = (e) => {
    e.preventDefault();

    const errors = this.validate();
    if (errors) {
      this.setState({ errors });
      return;
    }

    console.log("Login and password submitted");
  };

  validate = () => {
    const errors = {};
    const { account } = this.state;

    if (account.username.trim() === "") errors.username = "Username is required.";
    if (account.password.trim() === "") errors.password = "Password is required.";

    if (Object.keys(errors).length === 0) {
      return null;
    } else {
      console.log("Errors", errors);
      return errors;
    }
  };
}

export default LoginForm;
