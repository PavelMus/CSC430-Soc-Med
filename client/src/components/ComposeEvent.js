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
      showPreview: false,
      saveDeltaInterval: null
    }
  }

  rawMarkup = () => {
    console.log(this.state.deltaMarkup.toString());
    
    let rawMarkup = marked(this.state.deltaMarkup.toString());
    return { __html: rawMarkup };
  }

  eventPreview = () => {
      return (
        <div id="preview" className="col s12 m12 l8 lx8">
            <span dangerouslySetInnerHTML={this.rawMarkup()}></span>
        </div>
      );
  }

  showEventPreview = (e) => {
    e.preventDefault();
    this.saveDelta();
    this.setState({showPreview: !this.state.showPreview});
  }

  componentDidMount() {
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
    let quillInit = new Quill("#quill", {
      modules: {
        toolbar: toolbarOptions
      },
      placeholder: "Componse an event post",
      theme: "snow"
    });

    let interval = setInterval(this.saveDelta,5000);

    this.setState({quill: quillInit, saveDeltaInterval: interval})
  }

  componentWillUnmount() {
    clearInterval(this.state.saveDeltaInterval);
  }

  headerChange = (e) =>{
    e.preventDefault();
    this.setState({header: e.target.value});
  }

  saveDelta = () => {
    let delta = this.state.quill.getContents();
    console.log(delta);
    let quill_innerHTML = document.getElementsByClassName('ql-editor')[0].innerHTML;
    //////////////////////////////////////////
    this.setState({deltaMarkup: quill_innerHTML , quillDelta: delta});
    console.log(quill_innerHTML);
    
  }

  submitEvent = () => {
    this.saveDelta();
    let eventPost = {
      author: this.props.user.displayName,
      title: this.state.header,
      delta: this.state.quillDelta,
      preview: this.state.deltaMarkup
    }
    axios.post("api/feed/event-post", eventPost).catch(err => {
      console.error(err);
    });
  }

  renderQuill = () => {
    var quillDisplay= new Quill(".quillDisplay", {
      modules: {
        toolbar: false
      },
      readOnly: true,
      theme: "snow"
    });
    quillDisplay.setContents(this.state.quillDelta);
  };

  consoleDelta = () =>{
    let test = document.getElementsByClassName('ql-editor')[0].innerHTML;
    let rawMarkup = marked(test);

    console.log(rawMarkup);
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
              <button id="saveDelta" className="btn" onClick={this.showEventPreview}>Preview</button>
              <button className="btn" onClick={this.saveDelta}>SAVE</button>
              <button className="btn" onClick={this.rawMarkup}>markup</button>
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