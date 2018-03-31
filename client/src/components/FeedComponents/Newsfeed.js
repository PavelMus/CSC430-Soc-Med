import React, { Component } from 'react';
import FeedPost from "./FeedPost";
class Newsfeed extends Component {
  constructor(props){
    super(props);

    this.state = {term: " "};
  }
  render() {
    return (
      <div>
        <div className="col s12 m6 l6 xl5" id="newsfeed">
            <h3>News feed</h3>
            <FeedPost/>
            <FeedPost/>
            <FeedPost/>
            <FeedPost/>
            <FeedPost/>
            <FeedPost/>
            <FeedPost/>
            <FeedPost/>
            <FeedPost/>
        </div>
      </div>
    );
  }
}


export default Newsfeed;
