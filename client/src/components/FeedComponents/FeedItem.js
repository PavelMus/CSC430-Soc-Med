import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AlertSection from "../AlertSection";
import FeedPost from "./FeedPost";
import FixedMenu from "../Fixedmenu";
import Loading from "../Loading";
import axios from "axios";
import Quill from "quill";
import * as M from "materialize-css";
import uuid from "uuid";

class FeedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedItem: false,
      quill: "",
      all_comments: "",
      new_comment: ""
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
    this.loadComments();
    axios.get(`${"/api"}${this.props.location.pathname}`).then(res => {
      this.setState({ feedItem: res.data }, this.initQuill);
    });
  }

  deleteFromFeed = e => {
    e.preventDefault();
    axios.delete(`${"/api"}${this.props.location.pathname}`).then(res => {
      M.toast({ html: res.data.message });
      this.props.history.push("/");
    });
  };

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

  loadComments = () => {
    let feed_id = this.props.location.pathname.slice(6);
    axios.get(`${"/api/get-comments"}/${feed_id}`).then(res => {
      this.mapComments(res.data);
    });
  };

  mapComments = comments => {
    this.setState({
      all_comments: comments.map(cmt => {
        return (
          <li key={uuid()}>
            <div className="card horizontal">
              <div className="card-image">
                <img src={cmt.user_avatar} />
              </div>
              <div className="card-stacked">
                <div className="card-content">
                  <p>{cmt.content}</p>
                </div>
              </div>
            </div>
          </li>
        );
      })
    });
  };

  renderComments = () => {
    switch (this.state.all_comments) {
      case false:
        return "";
      default:
        return (
          <ul>
            {this.state.all_comments}
          </ul>
        );
    }
  };

  renderNewCommentForm = () => {
    switch (this.props.user) {
      case null:
        return "";
      default:
        return (
          <div className="new-comment">
            <form
              className="input-comment-form"
              onSubmit={this.submitNewComment}
            >
              <div className="input-comment-body">
                <img className="circle" src={this.props.user.avatar} />
                <input
                  onChange={this.onCommentChange}
                  value={this.state.new_comment}
                  placeholder="Leave a comment"
                />
                <button className="btn-small">
                  <i className="material-icons">send</i>
                </button>
              </div>
            </form>
          </div>
        );
    }
  };

  onCommentChange = e => {
    this.setState({ new_comment: e.target.value });
  };

  submitNewComment = e => {
    e.preventDefault();
    let feed_id = this.props.location.pathname.slice(6);
    let date = new Date();

    let comment = {
      user_name: this.props.user.displayName,
      user_avatar: this.props.user.avatar,
      content: this.state.new_comment,
      postDate: date.toLocaleString()
    };
    axios.post(`${"/api/new-comment"}/${feed_id}`, comment).then(res => {
      M.toast({ html: res.data.message });
      this.loadComments();
      this.setState({new_comment: ""});
    });
  };

  render() {
    return (
      <div id="content-section-container" className="container">
        <div className="event-editor-area-wrapper">
          <div className="row">
            <div className="col s12 m2 l2 xl2">
              <FixedMenu />
            </div>
            <div className="middle-right-section col s12 m10 l7 xl7">
              <div className="feed-item-container">
                {this.state.feedItem ? this.renderContent() : ""}
                <div className="feed-item-body">
                  <div id="quill" />
                </div>
              </div>
              <div className="comments">{this.renderComments()}</div>
              {this.renderNewCommentForm()}
            </div>
            <div className="col l3 xl3">{this.renderUser()}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default withRouter(connect(mapStateToProps)(FeedItem));
