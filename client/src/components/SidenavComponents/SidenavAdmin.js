import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
          <Link className="waves-effect" onClick={this.props.close} to="/newNews">
          <i className="material-icons">public</i>
          POST NEWS ITEM</Link>
        </li>
        <li>
          <Link className="waves-effect" onClick={this.props.close} to="/newEvent">
          <i className="material-icons">event_note</i>
          POST EVENT ITEM</Link>
        </li>
        <li>
          <Link className="waves-effect" onClick={this.props.close} to="/newAlert">
          <i className="material-icons">notifications_none</i>
          POST ALERT ITEM</Link>
        </li>
        {/*
        <li>
          <Link className="waves-effect" to="">Action 4</Link>
        </li>
        <li>
          <div className="divider" />
        </li>
        <li>
          <Link className="subheader">
            <i className="material-icons">school</i>
            STAFF
          </Link>
        </li>
        <li>
          <Link className="waves-effect" to="">
            Staff 1
          </Link>
        </li>
        <li>
          <Link className="waves-effect" to="">
            Staff 2
          </Link>
        </li>
        <li>
          <Link className="waves-effect" to="">
            Staff 3
          </Link>
        </li>
        <li>
          <Link className="waves-effect" to="">
            Staff 4
          </Link>
        </li>
        */}
      </React.Fragment>
    )
  }
}
