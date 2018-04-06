import React, { Component } from "react";
import AlertModal from "./AlertModal";
import { WEATHER_ALERT } from "./types";
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
            <div className="expand-btn">
              <a className="waves-effect waves-light btn"
              onClick={this.showModal}
            >Expand</a>
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
