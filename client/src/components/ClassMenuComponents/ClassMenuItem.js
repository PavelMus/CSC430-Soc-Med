import React, { Component } from "react";

class ClassMenuItem extends Component {
  constructor(props) {
    super(props);
  }
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
  render() {
    return (
      <React.Fragment>
        {/*/First class below*/}
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
      </React.Fragment>
    );
  }
}

export default ClassMenuItem;
