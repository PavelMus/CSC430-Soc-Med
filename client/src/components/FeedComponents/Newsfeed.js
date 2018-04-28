import React, { Component } from "react";
import { connect } from 'react-redux';
import FeedPost from "./FeedPost";
import Loading from '../Loading';
import axios from "axios";
class Newsfeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feed: null,
      isLoading: false,
      loadSkip: 0
    };

    //this.pollInterval = null;
  }

  updateFeed = () => {
    axios.get(`${"api/main-feed"}/${(this.state.loadSkip+6)}`).then(res => {
      let updatedFeed = this.state.feed.concat(res.data);
      this.setState({ feed: updatedFeed, loadSkip: (this.state.loadSkip+6), isLoading: false});
    });
  }

  //loadFeed sends a get request to the database to grab the latests feed items
  //and then stores them in this components state
  loadFeed = () => {
    axios.get(`${"api/main-feed"}/${this.state.loadSkip}`).then(res => {
      this.setState({ feed: res.data });
    });
  };

  onScroll = () => {
    if (
      (window.innerHeight + window.pageYOffset) >= document.body.scrollHeight - 1
      && !this.state.isLoading
    ) {
      this.setState({isLoading: true}, this.updateFeed);
    }
  }

  //When the component mounts, use loadFeed function to grab the latests feed
  //items from the database, then it sets an interval to send another request to
  //the database, the interval is set in the props of this component
  componentDidMount() {
    window.addEventListener(
      "scroll",
      () => window.requestAnimationFrame(this.onScroll), false);

    this.loadFeed();
    /*if (!this.pollInterval)
    this.pollInterval = setInterval(
      this.loadFeed,
      this.props.pollInterval
    );*/
  }


  //When the component unmounts this will reset the interval
  componentWillUnmount() {
    window.removeEventListener("scroll",
    () => window.requestAnimationFrame(this.onScroll), false);
    /*this.pollInterval && clearInterval(this.pollInterval);
    this.pollInterval = null;*/
  }

  render() {
    switch (this.state.feed) {
      case null:
        return (
        <div className="col s12 m4 l8 xl6" id="newsfeed">
          <Loading/>
        </div>
      );
      default:
        let { feed } = this.state;
        return (
          <div className="col s12 m4 l8 xl6" id="newsfeed">
            {feed.map( data => (
              <FeedPost
              user={this.props.user}
              author={data.feedItem.author}
              authorAvatar={data.feedItem.authorAvatar}
              title={data.feedItem.title}
              content={data.feedItem.preview}
              postDate={data.feedItem.postDate}
              key={data["_id"]}
              feed_id={data["_id"]}
              />
            ))
            }
          </div>
        );
    }
  }
}

const mapStateToProps = state => {
  return {user: state.user};
}

export default connect(mapStateToProps)(Newsfeed);
