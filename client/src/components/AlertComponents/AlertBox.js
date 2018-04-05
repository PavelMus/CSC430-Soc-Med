import React, { Component } from "react";
import AlertMessage from "./AlertMessage";
import AlertModal from "./AlertModal";
import { WEATHER_ALERT } from "./types";
import * as anime from "animejs";

class AlertBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };

    this.alertType = this.alertType.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  alertType() {
    switch (this.props.type) {
      case WEATHER_ALERT:
        return "Weather Alert";
      default:
        return "Alert";
    }
  }

  showModal(e) {
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
            <p>
              A chance of rain before 4am, then snow likely, possibly mixed with
              rain. Increasing clouds, with a low around 32. Northwest wind 8 to
              10 mph becoming northeast after midnight. Chance of precipitation
              is 60%. New snow accumulation of 1 to 2 inches possible.
            </p>
          </div>
          <div className="alert-footer">
            <span>Thu, 05 Apr 2018 00:22:37 GMT</span>
            <a className="waves-effect waves-light btn"
              onClick={this.showModal}
            >Expand</a>
          </div>
        </div>
        {this.state.show ? (
          <React.Fragment>
            <AlertModal
              type={this.alertType()}
              alertMsg={<AlertMessage />}
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
