import React, { Component } from "react";
import Leftsection from "./Leftsection";
import Rightsection from "./Rightsection";
import Newsfeed from "./FeedComponents/Newsfeed";

class Landing extends Component {
  render() {
    return (
      <div id="content-section-container" className="container">
        <div className="row" id="content-area-row">
          <div className=""></div>
          <Leftsection />
          <Newsfeed />
          <Rightsection />
        </div>
      </div>
    );
  }
}

export default Landing;
