import React, { Component } from "react";
import Leftsection from "./Leftsection";
import Rightsection from "./Rightsection";
import Newsfeed from "./Newsfeed";

class Landing extends Component {
  render() {
    return (
      <div className="row" id="content-area-row">
      <div className="divider"></div>
        <Leftsection />
        <Newsfeed />
        <Rightsection />
      </div>
    );
  }
}

export default Landing;
