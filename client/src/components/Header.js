import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Sidenav from "./Sidenav";
import SearchBar from "./SearchBar";
import * as M from "materialize-css";
import logo from "../img/logo.PNG";

class Header extends Component {
  constructor(props) {
    super(props);

    this.renderContent = this.renderContent.bind(this);
  }

  renderContent() {
    //Initializing Javascript variables for Materialize-CSS sidenav
    var sidenav = document.querySelector(".sidenav");
    var sidenavInst = M.Sidenav.init(sidenav, { edge: "right" });

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
          <React.Fragment>
            <li>
              <a href="/posts" className="btn-floating btn-medium cyan pulse">
                <i className="material-icons">comment</i>
              </a>
            </li>
            <li className="header-user-btn">
              <a
                data-target="slide-out"
                className="sidenav-trigger waves-effect waves-light show-on-medium-and-down show-on-medium-and-up"
              >
                <img
                  id="header-avatar"
                  className="circle z-depth-2"
                  src={this.props.auth.avatar}
                />
                <span className="hide-on-med-and-down">
                  {this.props.auth.displayName}
                </span>
              </a>
            </li>
          </React.Fragment>
        );
    }
  }
  render() {
    return (
      <div id="header-div">
        <nav id="header-nav">
          <div id="nav-wrapper" className="container">
            <div id="header-row" className="row">
              <div id="header-logo" className="col m3 l3 xl3">
                <Link
                  to={this.props.auth ? "/" : "/Landing"}
                  className="brand-logo"
                >
                  <img src={logo} alt="sitelogo" />
                </Link>
              </div>
              <SearchBar />

              <div id="header-buttons" className="col m4 l4 xl4">
                <ul className="right">{this.renderContent()}</ul>
              </div>
            </div>
          </div>
        </nav>
        <Sidenav/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
