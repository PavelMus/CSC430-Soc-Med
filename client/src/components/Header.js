import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Sidenav from "./SidenavComponents/Sidenav";
import SearchBar from "./SearchBar";
import * as M from "materialize-css";
import logo from "../img/logo.PNG";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidenavInst: "",
      sideNavInterval: ""
    };
  }

  closeSideNav = () =>{
    console.log("IM HERE!");
    this.state.sidenavInst.close();
  }

  //When the component mounts, set the interval for the sidenav initialization function
  //and then set the interval id in to the state to clear it later.
  componentDidMount(){
    let interval = setInterval(this.initSidenav, 100);
    this.setState({ sideNavInterval: interval});
  }

  //Initializing Javascript variables for Materialize-CSS sidenav this function is on a small interval,
  //The javascript variable need the html tags to be rendered before they can be initialized, and since
  //the sidenav requires information from the server before it is rendered, this requires a delayed function call.
  initSidenav = () => {
    let sidenavDOM = document.getElementById("slide-out");
    if (sidenavDOM != null){
      let sidenav = document.querySelector(".sidenav");
      let sidenavInst = M.Sidenav.init(sidenav, { edge: "right" });
      clearInterval(this.state.sideNavInterval);
      this.setState({ sideNavInterval: "", sidenavInst: sidenavInst });
    }
  }

  //Renders the sidenav with props that are passed down from the user database.
  renderSidenav = () => {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return;
      default:
        let user = this.props.auth;
        return (
            <Sidenav
              email={user.emails[0].value}
              name={user.displayName}
              avatar={user.avatar}
              admin={user.admin}
              teacher={user.teacher}
              close={this.closeSideNav}
            />
        );
    }
  };

  //The content of the page is rendered when the information on whether or not a user logged in,
  //and when said data was successfully stored in the props from the Redux store.
  renderContent = () => {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <React.Fragment>
            {/*<li>
              <a href="/auth/google">Login With Google</a>
            </li>*/}
            <li>
              <a href="/api/login">Login</a>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </React.Fragment>
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
  };
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
        {this.renderSidenav()}
      </div>
    );
  }
}

//Maps the user accont info from the Redux store to the component props.
const mapStateToProps = state =>{
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
