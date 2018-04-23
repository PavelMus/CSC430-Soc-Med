import React, { Component } from "react";
import { Link } from "react-router-dom";
import { iconType } from "./iconTypes";

class ClassMenuItem extends Component {
  constructor(props) {
    super(props);
  }
  dropdownClick = e => {
    e.preventDefault();
    console.log(e.target.target);
    if (e.target.target) {
      var element = document.getElementById(e.target.target);
      var element_a = document.getElementById(e.target.target + "a_tag");
      console.log(e.target);
    } else {
      var element = document.getElementById(e.target.parentElement.target);
      //console.log(e.target.parentElement);
      var element_a = document.getElementById(
        e.target.parentElement.target + "a_tag"
      );
    }

    //To show the Ul
    if (!element.classList.contains("show")) {
      element.classList.add("show");
      element_a.classList.add("clicked");
    } else {
      element.classList.remove("show");
      element_a.classList.remove("clicked");
    }
  };

  renderMenu = () => {
    if(this.props.user._id === this.props.class.teacher){
      return this.teacherMenu();
    }else {
      return this.studentMenu();
    }
  }

  teacherMenu = () =>{
    return (
      <React.Fragment>
        <li>
          <Link to={`${"/ClassAnnouncements"}/${this.props.class._id}`}>
            Announcements
          </Link>
        </li>
        <li>
          <Link to={`${"/ClassContent"}/${this.props.class._id}`}>Content</Link>
        </li>
        <li>
          Verify Students
        </li>
      </React.Fragment>
    );
  }

  studentMenu = () => {
    return (
      <React.Fragment>
        <li>
          <Link to={`${"/ClassAnnouncements"}/${this.props.class._id}`}>
            Announcements
          </Link>
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
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <a
          id={this.props.class._id + "a_tag"}
          target={this.props.class._id}
          onClick={this.dropdownClick}
          className="menu-hoverable dropbtn"
        >
          <i className="left-icon material-icons">
            {iconType(this.props.class.type)}
          </i>
          <span>
            {this.props.class.type}
            {this.props.class.level}
          </span>
          <i className="right-icon material-icons">arrow_drop_down</i>
        </a>
        <ul id={this.props.class._id} className="class-item">
          {this.renderMenu()}
        </ul>
      </React.Fragment>
    );
  }
}

export default ClassMenuItem;
