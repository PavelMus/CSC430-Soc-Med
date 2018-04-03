import React, { Component } from "react";
import FeedPost from "./FeedPost";
import Loading from '../Loading';
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

  //loadFeed sends a get request to the database to grab the latests feed items
  //and then stores them in this components state
  loadFeed = () => {
    axios.get("api/feed").then(res => {
      this.setState({ feed: res.data });
    });
  };

  //When the component mounts, use loadFeed function to grab the latests feed
  //items from the database, then it sets an interval to send another request to
  //the database, the interval is set in the props of this component
  componentDidMount() {
    this.loadFeed();
    if (!this.pollInterval)
    this.pollInterval = setInterval(
      this.loadFeed,
      this.props.pollInterval
    );
  }


  //When the component unmounts this will reset the interval
  componentWillUnmount() {
    this.pollInterval && clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  render() {
    switch (this.state.feed) {
      case []:
        return <Loading />
      default:
        let { feed } = this.state;
        return (
          <div className="col s12 m6 l8 xl6" id="newsfeed">
            {feed.map( data => (
              <FeedPost
              author={data.feedItem.author}
              authorAvatar={data.feedItem.authorAvatar}
              title={data.feedItem.title}
              content={data.feedItem.preview}
              postDate={data.feedItem.postDate}
              key={data["_id"]}
              feed_id={data["_id"]}
            />
            ))}
          </div>
        );
    }
  }
}

export default Newsfeed;
