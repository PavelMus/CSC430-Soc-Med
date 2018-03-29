import React, { Component } from "react";
import AlertMessage from "./AlertMessage";
import {WEATHER_ALERT} from './types';


class AlertBox extends Component {
  constructor(props) {
    super(props);

    this.alertType = this.alertType.bind(this);
  }

  alertType(){
    switch (this.props.type) {
      case WEATHER_ALERT:
        return "Weather Alert";
      default:
        return "Alert";
    }
  }

  render() {
    return (
      <div className="alert-box hoverable">
        <div className="alert-header">
          <div className="alert-type">
            <i className="material-icons">{this.props.type}</i>
            <div>{this.alertType()}</div>
            <i className="material-icons">{this.props.type}</i>
          </div>
        </div>
        <AlertMessage />
      </div>
    );
  }
}

export default AlertBox;
