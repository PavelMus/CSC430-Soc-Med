import React, { Component } from 'react'

export default class SidenavStudent extends Component {
  render() {
    return (
      <React.Fragment>
        <li>
          <a className="subheader">
            <i className="material-icons">face</i>
            TEACHERS
          </a>
        </li>
        <li>
          <a className="waves-effect" href="#!">Teacher 1</a>
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
            CLASSMATES
          </a>
        </li>
        <li>
          <a className="waves-effect" href="#!">
            Classmate 1
          </a>
        </li>
        <li>
          <a className="waves-effect" href="#!">
            Classmate 2
          </a>
        </li>
        <li>
          <a className="waves-effect" href="#!">
            Classmate 3
          </a>
        </li>
        <li>
          <a className="waves-effect" href="#!">
            Classmate 4
          </a>
        </li>
      </React.Fragment>
    )
  }
}
