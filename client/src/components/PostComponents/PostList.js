import React, { Component } from "react";
import Post from "./Posts";

export class PostList extends Component {
  render() {
    let postNodes = this.props.data.map(post => {
      return (
        <Post 
        author={post.author} 
        uniqueID={post["_id"]} 
        key={post.id}
        onPostDelete = {this.props.onPostDelete}>
        {post.text}
        </Post>
      );
    });
    return <div className="row">{postNodes}</div>;
  }
}
export default PostList;
