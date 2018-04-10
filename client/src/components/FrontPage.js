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
          <Newsfeed pollInterval = {5000}/>
          <AlertSection />
        </div>
      </div>
    );
  }
}

export default FrontPage;
