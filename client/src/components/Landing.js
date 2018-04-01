import React, { Component } from "react";
import Leftsection from "./Leftsection";
import Rightsection from "./Rightsection";
import Newsfeed from "./FeedComponents/Newsfeed";

class Landing extends Component {
  render() {
    return (
      <div id="content-section-container" className="container">
        <div className="row" id="content-area-row">
          <div className="Leftsection col s12 m12 l12 xl2">
            <Leftsection />
          </div>

          <div className="middle-right-section col s12 m12 l12 xl9">
            <Newsfeed
              pollInterval = {5000}
            />
            <Rightsection />
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
