import React, { Component } from "react";
import marked from 'marked';

export class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      content: "",
      toBeUpdated: false
    }
  }

  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    console.log(rawMarkup);
    
    return { __html: rawMarkup };
  }

  render() {
    return (
      <div class="col s12 m6">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">{this.props.author}</span>
            <p>{this.props.content}</p>
          </div>
          <div class="card-action">
            <a href="">This is a link</a>
            <a href="">This is a link</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Posts;
