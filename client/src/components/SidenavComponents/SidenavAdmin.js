import React, { Component } from 'react';
import {Link} from 'react-router-dom';
export default class SidenavAdmin extends Component {
  render() {
    return (
      <React.Fragment>
        <li>
          <a className="subheader">
            <i className="material-icons">call_to_action</i>
            ACTIONS
          </a>
        </li>
        <li>
          <Link className="waves-effect" to="/newEvent">
          <i className="material-icons">public</i>
          POST NEWS ITEM</Link>
        </li>
        <li>
          <a className="waves-effect" href="#!">
          <i className="material-icons">event_note</i>
          POST EVENT ITEM</a>
        </li>
        <li>
          <a className="waves-effect" href="#!">
          <i className="material-icons">notifications_none</i>
          POST ALERT ITEM</a>
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
