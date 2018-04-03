import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import tempimg from '../../img/temp-user-img.jpg';
import axios from 'axios';
import marked from 'marked'
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

  giveLog = (e) =>{
    //e.preventDefault();
    axios.get(`${this.state.feedURL}/${this.props.feed_id}`)
    .then(res => console.log(res.data));
  }

  renderContent = () =>{
    let content = marked(this.props.content);
    return {__html: content};
  }

  render() {
    return (
        <div className="feed-post hoverable">
          <h3><a href="">{this.props.title}</a></h3>
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
                  <div className="i-wrapper">
                    <i className="material-icons">comment</i>
                  </div>
                  {/*  <span>Comment</span>*/}
                </div>
              </div>
            </div>

            <div id="comment-section" class="comments-container">
              {/* <h4>
                <span className="input-comment-header"><i class=" material-icons">comment</i> Comments</span>
              </h4>
              */}
              <div class="comments">
              </div>
              <div class="new-comment">
                <form >
                    <div class="input-comment-section">
                      <div class="user-pic-wrapper">
                        <img class="user-pic" src={tempimg} width="64"/>
                      </div>
                      <div class="input-comment-body">
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
