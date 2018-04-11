import React, { Component } from "react";
import AlertSection from "./AlertSection";
import Fixedmenu from "./Fixedmenu";
import Newsfeed from "./FeedComponents/Newsfeed";

class FrontPage extends Component {
  render() {
    return (
      <div id="content-section-container" className="container">
        <div className="row" id="content-area-row">

          <div className="col s12 m2 l3 xl3">
            <Fixedmenu />
          </div>

          <div className="middle-right-section col s12 m6 l9 xl9">
            <div className="row" id="middle-right-row">
              <Newsfeed pollInterval = {5000}/>
              <div className="left-section col s12 m3 l4 xl4">
                <AlertSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FrontPage;
