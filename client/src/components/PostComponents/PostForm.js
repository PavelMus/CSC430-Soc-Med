import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

export class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = { author: "", text: "" };
    this.onTextChange = this.onTextChange.bind(this);
    this.onPostSubmit = this.onPostSubmit.bind(this);
  }

  onTextChange(e) {
    this.setState({ text: e.target.value });
  }

  onPostSubmit(e) {
    e.preventDefault();
    let author = this.props.author.displayName.trim();
    let text = this.state.text.trim();
    if (!text) {
      return;
    }
    this.props.onPostSubmit({ author: author, text: text });
    this.setState({ text: "" });
  }
  render() {
    return (
      <div>
        <div className="row" onSubmit={this.onPostSubmit}>
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">account_circle</i>
                <input
                  id="icon_prefix"
                  type="text"
                  className="validate"
                  value={this.state.text}
                  onChange={this.onTextChange}
                />
                <label>Leave a post</label>
                <input type="submit" value="Post" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
      author: state.user
    };
    
  };

export default connect(mapStateToProps, actions)(PostForm);