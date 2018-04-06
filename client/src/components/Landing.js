import React, { Component } from "react";
import Leftsection from "./Leftsection";
import Rightsection from "./Rightsection";
import Newsfeed from "./FeedComponents/Newsfeed";

class Landing extends Component {
  render() {
    return (
      <div id="content-section-container" className="container">

        <div className="row" id="content-area-row">
          <div className="left-section col s12 m3 l3 xl3">
            <Leftsection />
          </div>
          <div className="middle-right-section col s12 m6 l8 xl8">
          <div className="row" id="middle-right-row">
            <Newsfeed
              pollInterval = {5000}

            />
            <div className="col s12 m2 l4 xl4">
              <Rightsection />
            </div>
          </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Landing;
