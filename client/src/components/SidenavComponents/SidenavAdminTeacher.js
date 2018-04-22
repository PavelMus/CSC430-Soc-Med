import React, { Component } from 'react';

export default class SidenavAdminTeacher extends Component {
  render() {
    return (
      <React.Fragment>
        <li>
          <a className="subheader">
            <i className="material-icons">face</i>
            ADMINS
          </a>
        </li>
        <li>
          <a className="waves-effect" href="#!">{this.props.user.id}</a>
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
            TEACHERS
          </a>
        </li>
        <li>
          <a className="waves-effect" href="#!">
            Teacher 1
          </a>
        </li>
        <li>
          <a className="waves-effect" href="#!">
          Teacher 2
          </a>
        </li>
        <li>
          <a className="waves-effect" href="#!">
          Teacher 3
          </a>
        </li>
        <li>
          <a className="waves-effect" href="#!">
          Teacher 4
          </a>
        </li>
        <li>
          <a className="subheader">
            <i className="material-icons">school</i>
            STUDENTS
          </a>
        </li>
        <li>
          <a className="waves-effect" href="#!">
            Student 1
          </a>
        </li>
        <li>
          <a className="waves-effect" href="#!">
            Student 2
          </a>
        </li>
        <li>
          <a className="waves-effect" href="#!">
            Student 3
          </a>
        </li>
        <li>
          <a className="waves-effect" href="#!">
            Student 4
          </a>
        </li>
      </React.Fragment>
    )
  }
}
