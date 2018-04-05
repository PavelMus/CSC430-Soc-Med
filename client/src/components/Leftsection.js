import React, { Component } from 'react';
import Alerts from './AlertComponents/Alerts'

class Leftsection extends Component {
  constructor(props){
    super(props);

    this.state = {term: " "};
  }
  render() {
    return (
      <div id="left-section">
        <Alerts />
      </div>

    );
  }
}


export default Leftsection;
