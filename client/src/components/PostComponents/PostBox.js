import React, { Component } from "react";
import { connect } from "react-redux";
import PostList from "./PostList";
import PostForm from "./PostForm";
import * as actions from "../../actions";
import axios from "axios";

export class PostBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };

    this.postSubmit = this.postSubmit.bind(this);
    this.postDelete = this.postDelete.bind(this);
    this.loadPostsFromServer = this.loadPostsFromServer.bind(this);
    this.pollInterval = null;
  }

  postDelete(post_id) {
    axios
      .delete(`${this.props.url}/${post_id}`)
      .then(res => {
        console.log("Comment deleted");
      })
      .catch(err => {
        console.error(err);
      });
  }

  postSubmit(post) {
    let posts = this.state.data;
    post.id = Date.now();
    let newPosts = posts.concat([post]);
    this.setState({ data: newPosts });
    axios.post(this.props.url, post).catch(err => {
      console.error(err);
      this.setState({ data: posts });
    });
  }

  loadPostsFromServer() {
    axios.get(this.props.url).then(res => {
      this.setState({ data: res.data });
    });
  }
  componentWillMount() {
    this.loadPostsFromServer();
  }
  componentDidMount() {
    if (!this.pollInterval)
      this.pollInterval = setInterval(
        this.loadPostsFromServer,
        this.props.pollInterval
      );
  }

  componentWillUnmount() {
    this.pollInterval && clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  render() {
    return (
      <div id="postBox">
        <PostList 
        data={this.state.data}
        onPostDelete={this.postDelete}
         />
        <PostForm
          onPostSubmit={this.postSubmit}
        />
      </div>
    );
  }
}

export default PostBox;
