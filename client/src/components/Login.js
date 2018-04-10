import React, { Component } from "react";
import axios from 'axios';
import * as M from 'materialize-css';
import * as actions from '../actions';
import {connect} from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  redirectHome = () =>{
    this.props.history.push("/");
  }
  onEmailChange = e => {
    e.preventDefault();
    this.setState({ email: e.target.value });
  };
  onPasswordChange = e => {
    e.preventDefault();
    this.setState({ password: e.target.value });
  };
  loginSubmit = e => {
      e.preventDefault();
      let user = {
          email: this.state.email,
          password: this.state.password
      };
      axios.post("/api/login-local", user, {withCredentials: true}).then(res =>{
        setTimeout(this.redirectHome(), 2000);
      });
  }
  render() {
    return (
      <div id="login-form">
        <div className="row">
          <form
            id="login"
            className="col s12"
            onSubmit={this.loginSubmit}
          >
            <div className="row">
              <div className="input-field col s12">
                <input
                  name="email"
                  type="email"
                  className="validate"
                  value={this.state.email}
                  onChange={this.onEmailChange}
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  name="password"
                  type="password"
                  className="validate"
                  value={this.state.password}
                  onChange={this.onPasswordChange}
                  required
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="col s12 m6 l6 lx6">
              <input type="submit" value="LOGIN" className="btn" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {user: state.local};
};

export default connect(mapStateToProps, actions)(Login);
