import React, { Component } from 'react'

export default class SidenavAdmin extends Component {
  render() {
    return (
      <React.Fragment>
        <li>
          <a className="subheader">
            <i className="material-icons">face</i>
            ACTIONS
          </a>
        </li>
        <li>
          <a className="waves-effect" href="/newEvent">POST NEW EVENT</a>
        </li>
        <li>
          <a className="waves-effect" href="#!">Action 2</a>
        </li>
        <li>
          <a className="waves-effect" href="#!">Action 3</a>
        </li>
        <li>
          <a className="waves-effect" href="#!">Action 4</a>
        </li>
        <li>
          <div className="divider" />
        </li>
        <li>
          <a className="subheader">
            <i className="material-icons">school</i>
            STAFF
          </a>
        </li>
        <li>
          <a className="waves-effect" href="#!">
            Staff 1
          </a>
        </li>
        <li>
          <a className="waves-effect" href="#!">
            Staff 2
          </a>
        </li>
        <li>
          <a className="waves-effect" href="#!">
            Staff 3
          </a>
        </li>
        <li>
          <a className="waves-effect" href="#!">
            Staff 4
          </a>
        </li>
      </React.Fragment>
    )
  }
}
