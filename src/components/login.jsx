import React from "react";
import Input from "./common/input";

class Login extends React.Component {
  state = {
    account: { username: "", password: "" },
  };

  render() {
    // const { account } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleLogin}>
          <Input
            type="text"
            name="username"
            value={this.state.account.username}
            label="Username"
            onChange={this.handleChange}
          />
          <Input
            type="password"
            name="password"
            value={this.state.account.password}
            label="Password"
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
    console.log("Credentials submitted");
  };
}

export default Login;
