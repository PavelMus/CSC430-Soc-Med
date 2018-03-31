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
            <div className="alert-type">
              <i className="material-icons">{this.props.type}</i>
              <div>{this.alertType()}</div>
              <i className="material-icons">{this.props.type}</i>
            </div>
          </div>
          <AlertMessage />
          <a className="waves-effect waves-light btn" onClick={this.showModal}>
            Modal
          </a>
        </div>
        {this.state.show ? (
          <React.Fragment>
            <div className="modal-underlay" />
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
