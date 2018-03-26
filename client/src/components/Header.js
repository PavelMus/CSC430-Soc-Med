import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Sidenav from "./Sidenav";
import * as M from "materialize-css";

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
            <li>
              <a
                data-target="slide-out"
                className="sidenav-trigger waves-effect waves-light show-on-medium-and-down show-on-medium-and-up"
              >
                <div className="row">
                  <div className="col s12 m12 l6 xl6">
                    <img
                      id="header-avatar"
                      className="circle z-depth-2"
                      src={this.props.auth.avatar}
                    />
                  </div>
                  <div className="col l6 xl6">
                    <h6 className="hide-on-med-and-down">
                    {this.props.auth.displayName}
                    </h6>
                  </div>
                </div>
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
          <div className="nav-wrapper container">
            <div className="row">
              <div className="col xl2">
                <Link
                  to={this.props.auth ? "/" : "/Landing"}
                  className="left brand-logo"
                >
                  CSI Social Club
                </Link>
              </div>
              <div className="col xl6">
                <form id="header-search-bar">
                  <div className="input-field">
                    <input id="search" type="search" required />
                    <label className="label-icon" for="search"><i class="material-icons">search</i></label>
                    <i className="material-icons">close</i>
                  </div>
                </form>
              </div>
              <div className="col xl4">
                <ul className="right">{this.renderContent()}</ul>
              </div>
            </div>
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
