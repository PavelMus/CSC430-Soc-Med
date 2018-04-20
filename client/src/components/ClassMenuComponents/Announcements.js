import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Fixedmenu from "../Fixedmenu";
import Newsfeed from "../FeedComponents/Newsfeed";
import AlertSection from "../AlertSection";

class Announcements extends Component {
  constructor(props){
    super(props);
  }
  renderFixedMenu = () => {
    switch (this.props.user) {
      case null:   
        return "";
      case false:
        return "";
      default:
        return <Fixedmenu user={this.props.user} />;
    }
  }

  render() {
    return (
      <div id="content-section-container" className="container">
        <div className="row" id="content-area-row">

          <div className="col s12 m2 l2 xl2">
            {this.renderFixedMenu()}
          </div>

          <div id="class-content-wrapper" className="col s12 m6 l9 xl9">
            <div className="row">

              <div id="class-content-section" className="col s12 m3 l12 xl12">
                <div className="class-content-section-container">
                  <div className="content-header">
                    <h2>Announcements</h2>
                  </div>
                  <ul>
                    <div className="item-container">
                      <li className="item">

                        <h3 className="announcement-header">Review Problems for Exam II</h3>
                        <p><span>Posted on: Thursday, March 22, 2018 3:30:56 PM EDT</span></p>
                        <div>
                          <div class="announcement-body"><p>Hello everyone,</p>
                            <br/>
                            <p>Under content you can find some review problems for Exam II. Note that problems on the exam may (and will) vary.</p>
                            <br/>
                            <p>Best,</p>
                            <p>Prof. Jacobs.</p>
                            <br/>
                          </div>
                        </div>

                      </li>
                    </div>

                    <div className="item-container">

                      <li className="item">
                      <h3 className="announcement-header">Homework # 3 available</h3>
                      <p><span>Posted on: Tuesday, March 20, 2018 2:44:34 PM EDT</span></p>
                      <div>
                        <div class="announcement-body"><p>Hello,</p>
                          <br/>
                          <p>The updated version of Homework # 3 is available under content. The homework is due March 27, 2018.
                          </p>
                          <br/>
                          <p>Best,</p>
                          <p>Prof. Jacobs.</p>
                          <br/>
                        </div>
                      </div>
                      </li>
                    </div>

                    <div className="item-container">

                      <li className="item">
                      <h3 className="announcement-header">Homework # 2 available</h3>
                      <p><span>Posted on: Sunday, February 25, 2018 7:35:34 PM EST</span></p>
                      <div>
                        <div class="announcement-body"><p>Hello everyone,</p>
                          <br/>
                          <p>Note that the Homework is Due on Tuesday March 06, 2018 at 12:20 PM. I recommend that you complete the homework before the first exam.</p>
                          <br/>
                          <p>Best,</p>
                          <p>Prof. Jacobs</p>

                          <br/>
                        </div>
                      </div>
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

const mapStateToProps = state => {
  return {user: state.user};
};

export default withRouter(connect(mapStateToProps)(Announcements));
