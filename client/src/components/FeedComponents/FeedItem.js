import React, { Component } from "react";
import AlertSection from "../AlertSection";
import FeedPost from "./FeedPost";
import Loading from "../Loading";
import axios from "axios";
import Quill from "quill";
import * as M from 'materialize-css';

class FeedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedItem: false,
      quill: ""
    };
  }

  renderContent = () => {
    return (
      <div id="feed-item-header">
        <h4>{this.state.feedItem.feedItem.title}</h4>
      </div>
    );
  };

  initQuill = () => {
    if (this.state.feedItem == null) {
    } else {
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
      this.setState({ quill: quillInit });
    }
  };

  componentDidMount() {
    axios.get(`${"/api"}${this.props.location.pathname}`).then(res => {
      this.setState({ feedItem: res.data }, this.initQuill);
    });
  }

  deleteFromFeed = e => {
    e.preventDefault();
    axios.delete(`${"/api"}${this.props.location.pathname}`).then( res => {
      M.toast({html: res.data.message});
      this.props.history.push("/");
    })
  }

  renderUser = () => {
    switch (this.state.feedItem) {
      case false:
        return "";

      default:
        return (
          <div className="user-col col s12 m2 l2 xl2">
            <div className="user-info">
              <div className="user-pic-wrapper">
                <img
                  className="user-pic"
                  src={this.state.feedItem.feedItem.authorAvatar}
                  width="64"
                />
              </div>
              <p className="user-name">{this.state.feedItem.feedItem.author}</p>
              <p className="time">{this.state.feedItem.feedItem.postDate}</p>
            </div>
          </div>
        );
    }
  };

  renderComments = () => {
    switch (this.state.feedItem) {
      case false:
        return "";
      default:
        return (
          <div class="col s12 m7">
    <div class="card horizontal">
      <div class="card-image">
        <img src={this.state.feedItem.feedItem.authorAvatar} />
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <p>I am a very simple card. I am good at containing small bits of information.</p>
        </div>
      </div>
    </div>
  </div>
        )
    }
  }

  render() {
    return (
      <div id="content-section-container" className="container">
        <div className="event-editor-area-wrapper">
          <div className="row" id="content-area-row">
            {this.renderUser()}{" "}
            {/* Here we are calling the renderUser function*/}
            <div className="middle-right-section col s12 m10 l8 xl8">
              <div className="feed-item-container">
                {this.state.feedItem ? this.renderContent() : ""}
                <div className="feed-item-body">
                  <div id="quill" />
                </div>
              </div>
            </div>
            <div className="col l2 xl2">
              <a href="" className="btn-small" onClick={this.deleteFromFeed}>
                Delete Post
              </a>
            </div>
            {this.renderComments()}
          </div>
        </div>
      </div>
    );
  }
}

export default FeedItem;
