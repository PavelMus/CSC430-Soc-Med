import React, { Component } from 'react';
import tempimg from '../../img/temp-user-img.jpg';
class FeedPost extends Component {
  constructor(props){
    super(props);

    this.state = {
      author: "",
      title: "",
      postDate:"",
      content: ""
   };
  }
  render() {
    return (
      <div>
        <div className="feed-post hoverable">
          <h3><a href="">{this.props.title}</a></h3>
            <div className="divider"></div>
            <div className="feed-item-body">
              <p>{this.props.content}</p>
              <a className="read-more-link" href="">Read more...</a>
            </div>

            <div className="feed-item-footer">
              <div className="feed-item-footer-left"><time className=" js-relative-time">{this.props.postDate}</time> by
              <div className="chip">
                <img src={tempimg} alt="Contact Person"/>
                {this.props.author}
              </div>
              <div className="comment-button">
                <div className="i-wrapper">
                  <i className="material-icons">comment</i>
                </div>

                <span>Comment</span>
              </div>
              </div>
              </div>
        </div>
      </div>
    );
  }

}

export default FeedPost;
