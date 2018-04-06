import React, { Component } from "react";

export default class Register extends Component {
    registrationSubmit = (e) =>{
        //e.preventDefault();
        console.log("SUBMITTED!");
    }
  render() {
    return (
      <div id="register-form">
        <div className="row">
          <form id="registarion" className="col s12" method="post" action="/api/register" >
            <div className="row">
              <div className="input-field col s6">
                <input
                  placeholder="Placeholder"
                  name="first_name"
                  type="text"
                  className="validate"
                />
                <label htmlFor="first_name">First Name</label>
              </div>
              <div className="input-field col s6">
                <input name="last_name" type="text" className="validate" />
                <label htmlFor="last_name">Last Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input name="email" type="email" className="validate" />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input name="password" type="password" className="validate" />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input name="password2" type="password" className="validate" />
                <label htmlFor="password2">Confirm Password</label>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m6 l6 lx6">
                <div className="input-field inline">
                  <input name="EMPLID" type="text" className="validate" />
                  <label htmlFor="EMPLID">EMPLID</label>
                  <span
                    className="helper-text"
                    data-error="wrong"
                    data-success="right"
                  >
                    Enter your 9 digit EMPLID
                  </span>
                </div>
              </div>
            </div>
          </form>
          <div className="col s12 m6 l6 lx6">
              <button type="submit" form="registarion" onSubmit={this.rigistrationSubmit} className="btn">Register</button>
            </div>
        </div>
      </div>
    );
  }
}
