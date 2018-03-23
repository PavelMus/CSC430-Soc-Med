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
            <div className="user-icon-wrapper"><img src="https://pbs.twimg.com/profile_images/952537094085271553/Le35qXfX.jpg" alt="" class="responsive-img circle"/></div>

            <div className="card-action">
              <a href="#">Comment Here</a>
            </div>
          </div>
      </div>
    );
  }
}


export default Newsfeed;
