import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Fixedmenu from "../Fixedmenu";
import Newsfeed from "../FeedComponents/Newsfeed";
import AlertSection from "../AlertSection";


class ClassContent extends Component {
  constructor(props){
    super(props);
    this.state = {
      _class: "",
      content: ""
    }
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

  logtest = () => {
    console.log(this.state._class);
    console.log(this.state.content);
  }

  componentDidMount() {
    axios.get(`${"/api"}${this.props.location.pathname}`).then(res => {
      this.setState({_class: res.data, content: res.data.content}, this.logtest);
    });
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
                    <h2>Content</h2>
                  </div>
                  <ul>
                    <div className="item-container">
                      <i className="material-icons">assignment</i>
                      <li className="item"><a>Syllabus</a>
                      </li>
                    </div>

                    <div className="item-container">
                      <i className="material-icons">assignment</i>
                      <li className="item"><a>Chapter 01 Computer Abstractions and Technology</a>
                      </li>
                    </div>

                    <div className="item-container">
                      <i className="material-icons">assignment</i>
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

const mapStateToProps = state => {
  return {user: state.user};
};

export default withRouter(connect(mapStateToProps)(ClassContent));
