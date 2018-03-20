import React, { Component } from 'react';

class Leftsection extends Component {
  constructor(props){
    super(props);

    this.state = {term: " "};
  }
  render() {
    return (
      <div className="col s12 m4 l4 xl4" id="left-section">
        <h3>Important Alerts</h3>
      </div>

    );
  }
}


export default Leftsection;
