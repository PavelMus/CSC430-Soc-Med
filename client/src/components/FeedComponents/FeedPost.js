import React, { Component } from 'react';
import tempimg from '../../img/temp-user-img.jpg';
class FeedPost extends Component {
  constructor(props){
    super(props);

    this.state = { data: [], edit: false, text: "", post_id: "" };
  }
  render() {
    return (
      <div>
        <div className="feed-post">
          <h3><a href="">Nominations are Now Open - Student Leadership positions.</a></h3>
            <div className="divider"></div>
            <div className="feed-item-body">
              <p>If you are experiencing hunger, the College of Staten Island has a Food Pantry.  The Food Pantry is located in the Green Dolphin Lounge in Building 1C, the Campus Center. The CSI Food Pantry will offer healthy food selections to currently enrolled CSI students.  All information concerning applications to this food program will be kept confidential.</p>
              <a className="read-more-link" href="">Read more...</a>
            </div>

            <div className="feed-item-footer">
              <div className="feed-item-footer-left"><time class=" js-relative-time" datetime="2017-12-13T14:19:48Z" title="December 13, 2017  9:19 AM">March 30, 2018 at 9:19am</time> by
              <div className="chip">
                <img src={tempimg} alt="Contact Person"/>
                Louis Petingi
              </div>
              <div className="comment-button">
                <div className="i-wrapper">
                  <i class="material-icons">comment</i>
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
