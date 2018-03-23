import React, { Component } from 'react';

class Newsfeed extends Component {
  constructor(props){
    super(props);

    this.state = {term: " "};
  }
  render() {
    return (
      <div className="col s12 m4 l4 xl4" id="newsfeed">
          <h3>News feed</h3>
          <div className="card small">
            <div className="card-top">
              <img src="https://pbs.twimg.com/profile_images/952537094085271553/Le35qXfX.jpg" alt="" class="userimage responsive-img circle"/>
              <div className="username">Milkman272</div>
            </div>
            <div className="post-content">
              <p>Hella lumbersexual thundercats pour-over, heirloom kinfolk salvia migas. Activated charcoal photo booth hella, schlitz helvetica quinoa neutra chicharrones prism slow-carb. Intelligentsia unicorn disrupt chillwave waistcoat</p>
            </div>
            <div className="post-content">
              <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
              <i class="fa fa-commenting-o" aria-hidden="true"></i>
            </div>
            <div className="card-action">
              <a href="#">Comment Here</a>
            </div>
          </div>
      </div>
    );
  }
}


export default Newsfeed;
