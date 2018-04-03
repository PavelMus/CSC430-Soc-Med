import React, { Component } from "react";
import { connect } from 'react-redux'
import Leftsection from "./Leftsection";
import Rightsection from "./Rightsection";
import Quill from "quill";
import axios from "axios";
import marked from "marked";

class ComposeEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quill: null,
      quillDelta: null,
      deltaMarkup: '',
      header: '',
      showPreview: false
    }
  }

  quillMarkup = () => {
    let rawMarkup = marked(this.state.deltaMarkup.toString());
    return { __html: rawMarkup };
  }

  eventPreview = () => {
      return (
        <div id="preview" className="col s12 m12 l8 lx8">
            <span dangerouslySetInnerHTML={this.quillMarkup()}></span>
        </div>
      );
  }

  showEventPreview = (e) => {
    e.preventDefault();
    this.setState({showPreview: !this.state.showPreview});
  }

  initEventPreview = (e) =>{
    let quill_innerHTML = document.getElementsByClassName('ql-editor')[0].innerHTML;
    this.setState({deltaMarkup:quill_innerHTML}, this.showEventPreview(e));
  }

  componentDidMount() {
    //Setting up the Quill toolbar options
    let toolbarOptions = [
      ["bold", "italic", "underline", "strike"],
      ["blockquote"],
      [{ "header": [1, 2, 3, 4, 5, 6, false] }],
      [{ "list": "ordered" }, { "list": "bullet" }],
      [{ "indent": "-1" }, { "indent": "+1" }],
      [{ "size": [] }],
      ["link", "image", "video"],
      [{ "color": [] }, { "background": [] }],
      [{ 'align': [] }]
    ];
    //Initializing Quill state object
    let quillInit = new Quill("#quill", {
      modules: {
        toolbar: toolbarOptions
      },
      placeholder: "Componse an event post",
      theme: "snow"
    });
    //Saving the Quill object in to the state
    this.setState({quill: quillInit});
  }

  headerChange = (e) =>{
    e.preventDefault();
    this.setState({header: e.target.value});
  }

  submitEvent = () => {
    //Grabs the delta from the quill state object
    let delta = this.state.quill.getContents();
    //Grabs the HTML from whithin the Quill edditor
    let quill_innerHTML = document.getElementsByClassName('ql-editor')[0].innerHTML;
    //Sets the states and calls upload event after
    this.setState({deltaMarkup: quill_innerHTML , quillDelta: delta}, this.uploadEvent);
  }

  uploadEvent = () => {
    let eventPost = {
      author: this.props.user.displayName,
      avatar: this.props.user.avatar,
      title: this.state.header,
      delta: this.state.quillDelta,
      preview: this.state.deltaMarkup
    }
    axios.post("api/feed/event-post", eventPost).catch(err => {
      console.error(err);
    });
  }

  render() {
    return (
      <div id="event-section-container" className="container">
        <div className="row" id="content-area-row">
          <div id="event-editor-area" className="col s12 m12 l9 xl9">
            <form id="event-header">
              Event Header
              <input type="text" 
              value={this.state.header}
              onChange={this.headerChange} 
              placeholder="Enter Header">
              </input>
            </form>
            <div id="quill-area">
              <div id="quill" />
              <button id="saveDelta" className="btn" onClick={this.submitEvent}>SUBMIT</button>
              <button id="saveDelta" className="btn" onClick={this.initEventPreview}>Preview</button>
            </div>
          </div>
          <div className="col l3 lx3">
            <Rightsection/>
          </div>
          {this.state.showPreview ? this.eventPreview(): ""}
        </div>

      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {user: state.auth}
}

export default connect(mapStateToProps)(ComposeEvent);