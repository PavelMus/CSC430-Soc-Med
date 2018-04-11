import React, { Component } from "react";

import Fixedmenu from "./Fixedmenu";
import Newsfeed from "./FeedComponents/Newsfeed";
import AlertSection from "./AlertSection";

class ClassPage extends Component {
  render() {
    return (
      <div id="content-section-container" className="container">
        <div className="row" id="content-area-row">

          <div className="col s12 m2 l2 xl2">
            <Fixedmenu />
          </div>

          <div id="class-content-wrapper" className="col s12 m6 l9 xl9">
            <div className="row">

              <div id="class-content-section" className="col s12 m3 l12 xl12">
                <div className="class-content-section-container">
                  <div className="content-header">
                    <h2>Content</h2>
                  </div>
                  <ul>
                    <div className="item-container">
                      <i class="material-icons">assignment</i>
                      <li className="item"><a>Syllabus</a>
                      </li>
                    </div>

                    <div className="item-container">
                      <i class="material-icons">assignment</i>
                      <li className="item"><a>Chapter 01 Computer Abstractions and Technology</a>
                      </li>
                    </div>

                    <div className="item-container">
                      <i class="material-icons">assignment</i>
                      <li className="item"><a>Chapter 02 Instructions Language of the Computer</a>
                      </li>
                    </div>

                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ClassPage;
