import React, { Component } from "react";
import FeedPost from "./FeedPost";
import axios from "axios";
class Newsfeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feed: [],
      isLoading: false
    };

    this.pollInterval = null;
  }

  loadFeed = () => {
    axios.get("api/feed").then(res => {
      this.setState({ feed: res.data });
    });
  };

  componentDidMount() {
    this.loadFeed();
    if (!this.pollInterval)
    this.pollInterval = setInterval(
      this.loadFeed,
      this.props.pollInterval
    );
  }

  componentWillUnmount() {
    this.pollInterval && clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  render() {
    switch (this.state.feed) {
      case []:
        return "";
      default:
        let { feed } = this.state;
        return (
          <div>
            <div className="col s12 m6 l6 xl8" id="newsfeed">
              {feed.map( data => (
                <FeedPost
                author={data.feedItem.author}
                title={data.feedItem.title}
                content={data.feedItem.content}
                postDate={data.feedItem.postDate}
              />
              ))}
            </div>
          </div>
        );
    }
  }
}

export default Newsfeed;
