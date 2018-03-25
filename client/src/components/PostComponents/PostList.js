import React, { Component } from "react";
import Post from "./Posts";

export class PostList extends Component {
  render() {
    let postNodes = this.props.data.map(post => {
      return (
        <Post author={post.author} content = {post.text} uniqueID={post["_id"]} key={post.id} />
      );
    });
    return <div className="row">{postNodes}</div>;
  }
}
export default PostList;
