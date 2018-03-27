import React, { Component } from 'react';

class Newsfeed extends Component {
  constructor(props){
    super(props);

    this.state = {term: " "};
  }
  render() {
    return (
      <div className="col s12 m6 l6 xl6" id="newsfeed">
          <h3>News feed</h3>

          <div id="post" className="card small">

            <div className="card-top">
              <img src="https://pbs.twimg.com/profile_images/952537094085271553/Le35qXfX.jpg" alt="" class="userimage responsive-img circle"/>
              <div className="username">Milkman272</div>
            </div>

            <div className="post-content">
              <p className="post-text">Hella lumbersexual thundercats pour-over, heirloom kinfolk salvia migas. Activated charcoal photo booth hella, schlitz helvetica quinoa neutra chicharrones prism slow-carb. Intelligentsia unicorn disrupt chillwave waistcoat</p>
            </div>

            <div className="activity-section">
              <div className="user-actions">
                <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                <i class="fa fa-commenting-o" aria-hidden="true"></i>
              </div>
              <div className="comments">
                <ul>
                <li><a title="username">BlackMilk111 </a><span>Nice post bro!</span></li>
                <li><a title="username">JessicaRabbit72 </a><span>I appreciate this post.</span></li>
                <li><a title="username">Killmonger96 </a><span>Honestly your amazing!</span></li>
                </ul>
              </div>
              <div className="input-comment">
                <input type="text" name="comment-input" placeholder="Add a comment here"/>
              </div>
            </div>

          </div>

      </div>

    );
  }
}


export default Newsfeed;
