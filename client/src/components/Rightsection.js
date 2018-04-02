import React, { Component } from "react";

class Rightsection extends Component {
  constructor(props) {
    super(props);

    this.state = { term: " " };
  }
  render() {
    return (
      <div className="col s12 m3 l3 xl3 offset-xl4" id="right-section">
        <h4>My Classes</h4>
          <ul>
            <li>CSC 430</li>
            <li>CSC 429</li>
            <li>CSC 446</li>
            <li>MTH 338</li>
          </ul>
      </div>
    );
  }
}

export default Rightsection;
