import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import tempimg from '../../img/temp-user-img.jpg';
import axios from 'axios';
import marked from 'marked';
class FeedPost extends Component {
  constructor(props){
    super(props);

    this.state = {
      feedURL: "/api/feed",
      feedItemURL: "/feed",
      author: "",
      title: "",
      postDate:"",
      content: ""
   };
  }

  showCommentSection = (e) => {
    e.preventDefault();
    let element = document.getElementById(e.target.parentNode.target);
    if(!element.classList.contains('show')){
      element.classList.add("show");
    }else{
      element.classList.remove("show");
    }

  }

  renderContent = () =>{
    let content = marked(this.props.content);
    return {__html: content};
  }

  render() {
    return (
        <div className="feed-post hoverable">
          <h3><Link to={`${this.state.feedItemURL}/${this.props.feed_id}`} >{this.props.title}</Link></h3>
            <div className="divider"></div>
            <div className="feed-item-body">
              <div className="inputed-post" dangerouslySetInnerHTML={this.renderContent()}>

              </div>
            </div>
              <Link className="read-more-link" to={`${this.state.feedItemURL}/${this.props.feed_id}`} onClick={this.giveLog}>Read more...</Link>
            <div className="feed-item-footer">
              <div className="feed-item-footer-left"><time className=" js-relative-time">{this.props.postDate}</time> by

                <div className="chip">
                  <img src={this.props.authorAvatar} alt="Contact Person"/>
                  {this.props.author}
                </div>

                <div className="comment-button">
                  <a href="" target={this.props.feed_id} onClick={this.showCommentSection} className="i-wrapper">
                    <i className="material-icons">comment</i>
                  </a>
                  {/*  <span>Comment</span>*/}
                </div>
              </div>
            </div>

            <div id={this.props.feed_id} className="comments-container">
              <div className="comments">
              </div>
              <div className="new-comment">
                <form >
                    <div className="input-comment-section">
                      <div className="user-pic-wrapper">
                        <img className="user-pic" src={this.props.authorAvatar} width="64"/>
                      </div>
                      <div className="input-comment-body">
                        <input placeholder="Leave a comment"/>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
          </div>
    );
  }
}

export default FeedPost;
