import React, { Component } from "react";
import { Link } from 'react-router-dom';
import ClassItem from "./ClassMenuComponents/ClassMenuItem";
import ClassList from "./ClassMenuComponents/ClassList";

class Fixedmenu extends Component {
  constructor(props) {
    super(props);
  }
/*
  dropdownClick = e => {
    e.preventDefault();
    console.log(e);
    console.log(e.target);
    if (e.target.target) {
      var element = document.getElementById(e.target.target);
    } else {
      var element = document.getElementById(e.target.parentElement.target);
    }

    if (!element.classList.contains("show")) {
      element.classList.add("show");
    } else {
      element.classList.remove("show");
    }
  };
*/

  renderMenu = () => {

  }

  render() {
    return (
      <div id="fixedmenu">
        <div className="fixedmenu-wrapper">
          <h4 className="myclassesheader">My Classes</h4>
          <div className="divider" />
          <div className="dropdown">
            <ClassList user={this.props.user} />
            <Link to="/selectClasses">
              Select Classes
            </Link>
            {/*/First class below

            <a
              target="class1"
              onClick={this.dropdownClick}
              className="hoverable dropbtn"
            >
              <i className="left-icon material-icons">code</i>
              <span>CSC 430</span>
              <i className="right-icon material-icons">arrow_drop_down</i>
            </a>
              <ul id="class1">
                <li>
                  <a href="#">Announcements</a>
                </li>
                <li>
                  <a href="#">Content</a>
                </li>
                <li>
                  <a href="#">Teacher</a>
                </li>
                <li>
                  <a href="#">Classmates</a>
                </li>
              </ul>
            <a
              target="class2"
              onClick={this.dropdownClick}
              className="hoverable dropbtn"
            >
              <i className="left-icon material-icons">code</i>
              <span>CSC 429</span>
              <i className="right-icon material-icons">arrow_drop_down</i>
            </a>
              <ul id="class2">
                <li>
                  <a href="#">Announcements</a>
                </li>
                <li>
                  <a href="#">Content</a>
                </li>
                <li>
                  <a href="#">Teacher</a>
                </li>
                <li>
                  <a href="#">Classmates</a>
                </li>
              </ul>
            <a
              target="class3"
              onClick={this.dropdownClick}
              className="hoverable dropbtn"
            >
              <i className="left-icon material-icons">code</i>
              <span>CSC 446</span>
              <i className="right-icon material-icons">arrow_drop_down</i>
            </a>
              <ul id="class3">
                <li>
                  <a href="#">Announcements</a>
                </li>
                <li>
                  <a href="#">Content</a>
                </li>
                <li>
                  <a href="#">Teacher</a>
                </li>
                <li>
                  <a href="#">Classmates</a>
                </li>
              </ul>
            <a
              target="class4"
              onClick={this.dropdownClick}
              className="hoverable dropbtn "
            >
              <i className="left-icon material-icons">code</i>
              <span>MTH 338</span>
              <i className="right-icon material-icons">arrow_drop_down</i>
            </a>
              <ul id="class4">
                <li>
                  <a href="#">Announcements</a>
                </li>
                <li>
                  <a href="#">Content</a>
                </li>
                <li>
                  <a href="#">Teacher</a>
                </li>
                <li>
                  <a href="#">Classmates</a>
                </li>
              </ul>
              */}
          </div>
        </div>
      </div>
    );
  }
}

export default Fixedmenu;
