import React, { Component } from "react";
import marked from "marked";

export class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      content: "",
      toBeUpdated: false
    };
    this.deletePost = this.deletePost.bind(this);
  }

  deletePost(e) {
    e.preventDefault();
    let post_id = this.props.uniqueID;
    this.props.onPostDelete(post_id);
    console.log("Deleted!");
  }

  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    console.log(rawMarkup);
    return { __html: rawMarkup };
  }

  render() {
    return (
      <div className="col s12 m6">
        <div className="card blue-grey darken-1 hoverable">
          <div className="card-content white-text">
            <span className="card-title">{this.props.author}</span>
            <span dangerouslySetInnerHTML={ this.rawMarkup() } />
          </div>
          <div className="card-action">
            <a href="" onClick={this.deletePost}>
              DELETE
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Posts;
