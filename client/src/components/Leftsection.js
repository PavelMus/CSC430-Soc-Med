import React, { Component } from 'react';
import Alerts from './AlertComponents/Alerts'

class Leftsection extends Component {
  constructor(props){
    super(props);

    this.state = {term: " "};
  }
  render() {
    return (
      <div className="col s12 m3 l3 xl4" id="left-section">
        <Alerts />
      </div>

    );
  }
}


export default Leftsection;
