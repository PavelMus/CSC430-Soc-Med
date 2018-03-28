import React, { Component } from "react";

class Rightsection extends Component {
  constructor(props) {
    super(props);

    this.state = { term: " " };
  }
  render() {
    return (
      <div className="col s12 m3 l3 xl3" id="right-section">
        <h3>Right Section</h3>
        
      </div>
    );
  }
}

export default Rightsection;
