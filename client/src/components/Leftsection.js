import React, { Component } from 'react';

class Leftsection extends Component {
  constructor(props){
    super(props);

    this.state = {term: " "};
  }
  render() {
    return (
      <div className="col s12 m3 l3 xl3" id="left-section">
        <h3>Important Alerts</h3>
      </div>

    );
  }
}


export default Leftsection;
