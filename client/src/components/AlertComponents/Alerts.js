import React, { Component } from "react";
import AlertBox from "./AlertBox";
import {WEATHER_ALERT} from './types';
class Alerts extends Component {
  render() {
    return <AlertBox type={WEATHER_ALERT} />;
  }
}

export default Alerts;
