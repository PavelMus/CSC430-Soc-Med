import React, { Component } from "react";
import AlertBox from "./AlertBox";
import {WEATHER_ALERT} from './types';
class Alerts extends Component {
  render() {
    return(
      <React.Fragment>
      <h2 className="alert-section-header">Important Alerts! Look here!</h2>
      <AlertBox type={WEATHER_ALERT} />
      <AlertBox type={WEATHER_ALERT} />
      <AlertBox type={WEATHER_ALERT} />
      <AlertBox type={WEATHER_ALERT} />
      <AlertBox type={WEATHER_ALERT} />
      </React.Fragment>

    );
  }
}

export default Alerts;
