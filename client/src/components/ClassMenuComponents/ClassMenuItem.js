import React, { Component } from "react";
import { Link } from "react-router-dom";
import {iconType} from './iconTypes'

class ClassMenuItem extends Component {
  constructor(props) {
    super(props);
  }
  dropdownClick = e => {
    e.preventDefault();
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
        <a
          target={this.props.class._id}
          onClick={this.dropdownClick}
          className="hoverable dropbtn"
        >
          <i className="left-icon material-icons">{iconType(this.props.class.type)}</i>
          <span>{this.props.class.type}{this.props.class.level}</span>
          <i className="right-icon material-icons">arrow_drop_down</i>
        </a>
        <ul id={this.props.class._id} className="class-item">
          <li>
            <Link to={`${"/ClassAnnouncements"}/${this.props.class._id}`}>Announcements</Link>
          </li>
          <li>
            <Link to={`${"/ClassContent"}/${this.props.class._id}`}>Content</Link>
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
