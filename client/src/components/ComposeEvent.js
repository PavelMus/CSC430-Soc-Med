import React, { Component } from "react";
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

  convertQuill = () =>{

  }

  rawMarkup() {
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
    var quill = new Quill("#quill", {
      modules: {
        toolbar: toolbarOptions
      },
      placeholder: "Componse an event post",
      theme: "snow"
    });

    this.setState({quill: quill})
  }

  headerChange = (e) =>{
    e.preventDefault();
    this.setState({header: e.target.value});
  }

  saveDelta = () => {
    let delta = this.state.quill.getContents();
    let quill_innerHTML = document.getElementsByClassName('ql-editor')[0].innerHTML;
    //////////////////////////////////////////
    this.setState({deltaMarkup: quill_innerHTML , quillDelta: delta});
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
              <button id="saveDelta" className="btn" onClick={this.saveDelta}>SUBMIT</button>
              <button id="saveDelta" className="btn" onClick={this.showEventPreview}>Preview</button>
              <button className="btn" onClick={this.consoleDelta}>LOG</button>
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
export default ComposeEvent;
