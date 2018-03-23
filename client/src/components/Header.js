import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Sidenav from "./Sidenav";
import * as M from "materialize-css";

class Header extends Component {
  renderContent() {
    var elem = document.querySelector(".sidenav");
    var instance = M.Sidenav.init(elem, { edge: "right" });
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return (
          <div>
            <li>
              <a
                data-target="slide-out"
                className="sidenav-trigger waves-effect waves-light button-collapse show-on-medium-and-down show-on-medium-and-up"
              >
                <span className="hide-on-med-and-down">Profile</span>
                <i className="material-icons left">account_circle</i>
              </a>
            </li>
          </div>
        );
    }
  }
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link
              to={this.props.auth ? "surveys" : "/"}
              className="left brand-logo"
            >
              CSI Social Club
            </Link>
            <ul className="right hide-on-med-and-down">
              {this.renderContent()}
            </ul>
          </div>
        </nav>
        <Sidenav />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
