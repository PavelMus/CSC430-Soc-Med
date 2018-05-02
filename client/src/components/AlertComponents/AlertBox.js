import React, { Component } from "react";
import AlertModal from "./AlertModal";
import { WEATHER_ALERT } from "./types";
import { ASSIGNMENT_DUE } from "./types";
import { CLOSED } from "./types";
import { SAFETY_ALERT } from "./types";
import { CLASS_CANCELED } from "./types";
import { AMBER_ALERT } from "./types";
import {SCHOOL_CLOSED} from './types';
import * as anime from "animejs";

class AlertBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  alertType = () => {
    switch (this.props.type) {
      case WEATHER_ALERT:
        return "Weather Alert";
      case SCHOOL_CLOSED:
        return "School Closed Alert";
      case SAFETY_ALERT:
        return "Safety Alert";
      case AMBER_ALERT:
        return "Amber Alert";
      case CLASS_CANCELED:
        return "Class Canceled";
      case ASSIGNMENT_DUE:
        return "Assignment Alert";
      default:
        return "Alert";
    }
  }

  showModal = (e) => {
    e.preventDefault();
    this.setState({ show: !this.state.show });
  }

  render() {
    return (
      <React.Fragment>
        <div className="alert-box hoverable">
          <div className="alert-header">
            <i className="material-icons">{this.props.type}</i>
            <h5>{this.alertType()}</h5>
          </div>
          <div className="divider" />
          <div className="alert-message">
            <p>{this.props.content}</p>
          </div>
          <div className="alert-footer">
            <span>{this.props.date}</span>
            <div className="btn-wrapper">
              <a className="waves-effect waves-light btn"
              onClick={this.showModal}
            ><span id="expand">Expand</span></a>
            </div>
          </div>
        </div>
        {this.state.show ? (
          <React.Fragment>
            <AlertModal
              type={this.alertType()}
              alertMsg={this.props.content}
              date={this.props.date}
              close={this.showModal}
            />
          </React.Fragment>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default AlertBox;
