import React, { Component } from "react";
import Leftsection from "../Leftsection";
import Rightsection from "../Rightsection";
import FeedPost from './FeedPost';
import Loading from '../Loading'
import axios from 'axios';
import Quill from 'quill';
import tempimg from '../../img/temp-user-img.jpg';

class FeedItem extends Component {
    constructor(props) {
        super(props);
    this.state = {
        feedItem: false,
        quill: ""
    }
}

renderContent = () =>{
  return (
    <div id="feed-item-header">
      <h4>
        {this.state.feedItem.feedItem.title}
      </h4>
    </div>
  );
}

initQuill = () =>{
  if(this.state.feedItem == null){

  }
  else {
  let post = this.state.feedItem.feedItem;
  console.log(this.state.feedItem);

  let quillInit = new Quill("#quill", {
    modules: {
      toolbar: false
    },
    readOnly: true,
    theme: "snow"
  });
  quillInit.setContents(post.delta);
  this.setState({quill: quillInit});
}
}

componentDidMount(){
  axios.get(`${"/api"}${this.props.location.pathname}`)
  .then( res =>{
      this.setState({feedItem: res.data}, this.initQuill);
    });
}

renderUser = () => {
    switch (this.state.feedItem) {
      case false:
        return "";

      default:
      return(
        <div className="user-col col s6 m6 l2 xl2">
          <div className="user-info">
            <div class="user-pic-wrapper">
              <img class="user-pic" src={this.state.feedItem.feedItem.authorAvatar} width="64"/>
            </div>
            <p className="user-name">{this.state.feedItem.feedItem.author}</p>
            <p className="time">Dec 13, 2017</p>
          </div>
        </div>
      );
    }
}
  render() {
    return (
      <div id="content-section-container" className="container">
        <div className="event-editor-area-wrapper">
          <div className="row" id="content-area-row">

            {this.renderUser()} {/* Here we are calling the renderUser function*/}

            <div className="middle-right-section col s12 m12 l7 xl7">
              <div className="feed-item-container">


                {this.state.feedItem ? this.renderContent() : ""}
                <div className="feed-item-body">
                  <div id="quill">

                  </div>
                </div>
              </div>

              <div className="col l2 xl2">
                {/*    <Rightsection/> */}
              </div>`
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default FeedItem;
