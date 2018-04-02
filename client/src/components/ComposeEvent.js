import React, { Component } from "react";
import Leftsection from "./Leftsection";
import Rightsection from "./Rightsection";
import Quill from "quill";
import axios from 'axios';

class ComposeEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quill: null,
      quillDelta: null,
      header: ''
    }
  }

  componentDidMount() {
    let toolbarOptions = [
      ["bold", "italic", "underline", "strike"],
      ["blockquote"],
      [{ "header": [1, 2, 3, 4, 5, 6, false] }],
      [{ "list": "ordered" }, { "list": "bullet" }],
      [{ "indent": "-1" }, { "indent": "+1" }],
      [{ "size": ["small", false, "large", "huge"] }],
      ["link", "image", "video"],
      [{ "color": [] }, { "background": [] }],
      [{ "font": [] }],
      [{ 'align': [] }]
    ];
    var quill = new Quill("#quill", {
      modules: {
        toolbar: toolbarOptions
      },
      placeholder: "Componse an event post",
      theme: "snow"
    });

    this.setState({quill: quill})
  }

  previewEvent = () => {

  }

  headerChange = (e) =>{
    e.preventDefault();
    this.setState({header: e.target.value});
  }

  saveDelta = () => {
    let delta = this.state.quill.getContents();
    console.log(delta);
    this.setState({quillDelta: delta});
  }
  uploadDelta = () => {
    var delta = JSON.stringify(this.state.quillDelta);
    axios.post("api/quill", this.state.quillDelta).catch(err => {
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
    console.log(this.state.quillDelta);
    console.log(this.state.header);
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
              <button id="saveDelta" className="btn" onClick={this.saveDelta}>SUBMIT</button>
              <button id="saveDelta" className="btn" onClick={this.eventPreview}>Preview</button>
              <button className="btn" onClick={this.consoleDelta}>LOG</button>
            </div>
          </div>
          <div className="col l3 lx3">
            <Rightsection/>
          </div>

          <div id="preview" className="col s12 m12 l8 lx8">
          
          </div>
        </div>

      </div>
    );
  }
}

export default ComposeEvent;
