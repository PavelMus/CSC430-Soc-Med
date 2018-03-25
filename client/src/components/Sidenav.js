import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class Sidenav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      name: {
        familyName: "",
        givenName: ""
      }
    };
    this.getName = this.getName.bind(this);
  }

  componentDidMount() {
    this.props.userData();
  }

  getName() {
    return this.props.user
      ? this.props.user.displayName
      : this.state.displayName;
  }
  render() {
    return (
      <ul id="slide-out" className="sidenav">
        <li>
          <div className="user-view">
            <div className="background">
              <img src="images/office.jpg" alt="background" />
            </div>
            <a href="#!user">
              <img className="circle" src="images/yuna.jpg" alt="user avatar" />
            </a>
            <a href="#!name">
              <span className="black-text name">{this.getName()}</span>
            </a>
            <a href="#!email">
              <span className="white-text email">jdandturk@gmail.com</span>
            </a>
          </div>
        </li>
        <li>
          <a href="#!">
            <i className="material-icons">cloud</i>First Link With Icon
          </a>
        </li>
        <li>
          <a href="#!">Second Link</a>
        </li>
        <li>
          <div className="divider" />
        </li>
        <li>
          <a className="subheader">Subheader</a>
        </li>
        <li>
          <a className="waves-effect" href="#!">
            Third Link With Waves
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
    user: state.user
  };
};

export default connect(mapStateToProps, actions)(Sidenav);
