import React, { Component } from "react";
import Leftsection from "./Leftsection";
import Rightsection from "./Rightsection";
import Newsfeed from "./FeedComponents/Newsfeed";

class Landing extends Component {
  render() {
    return (
      <div id="content-section-container" className="container">
        <div className="row" id="content-area-row">
          <div className="col s12 m12 l3 xl3">
            <Leftsection />
          </div>
          <div className="middle-right-section col s12 m12 l9 xl9">

          <Newsfeed
            pollInterval = {5000}
          />
          <div className="col s12 m3 l3 xl3 offset-xl4" id="right-section">
            <Rightsection />
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
