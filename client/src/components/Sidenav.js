import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import * as M from "materialize-css";

class Sidenav extends Component {
  constructor(props) {
    super(props);
    this.getName = this.getName.bind(this);
    this.getAvatar = this.getAvatar.bind(this);
    this.getEmail = this.getEmail.bind(this);
  }

  getName() {
    return this.props.user ? this.props.user.displayName : "";
  }

  getAvatar() {
    return this.props.user ? this.props.user.avatar : "";
  }

  getEmail() {
    return this.props.user ? this.props.user.emails[0].value : "";
  }

  render() {
    return (
      <ul id="slide-out" className="sidenav">
        <li>
          <div className="user-view">
            <div className="background" id="sidenav-background" />
            <a href="#!user">
              <img
                className="circle"
                src={this.getAvatar()}
                alt="user avatar"
              />
            </a>
            <a href="#!name">
              <span className="black-text name">{this.getName()}</span>
            </a>
            <a href="#!email">
              <span className="white-text email">{this.getEmail()}</span>
            </a>
          </div>
        </li>
        <li>
          <a className="subheader">
            <i className="material-icons">face</i>
            TEACHERS
          </a>
        </li>
        <li>
          <a className="waves-effect" href="#!">Teacher 1</a>
        </li>
        <li>
          <a className="waves-effect" href="#!">Teacher 2</a>
        </li>
        <li>
          <a className="waves-effect" href="#!">Teacher 3</a>
        </li>
        <li>
          <a className="waves-effect" href="#!">Teacher 4</a>
        </li>
        <li>
          <div className="divider" />
        </li>
        <li>
          <a className="subheader">
            <i className="material-icons">school</i>
            CLASSMATES
          </a>
        </li>
        <li>
          <a className="waves-effect" href="#!">
            Classmate 1
          </a>
        </li>
        <li>
          <a className="waves-effect" href="#!">
            Classmate 2
          </a>
        </li>
        <li>
          <a className="waves-effect" href="#!">
            Classmate 3
          </a>
        </li>
        <li>
          <a className="waves-effect" href="#!">
            Classmate 4
          </a>
        </li>
        <li>
          <a href="/api/logout">Logout</a>
        </li>
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

export default connect(mapStateToProps, actions)(Sidenav);
