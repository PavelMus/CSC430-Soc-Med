import React, { Component } from "react";
import { connect } from 'react-redux'
import AlertSection from "./AlertSection";
import Fixedmenu from "./Fixedmenu";
import tempimg from '../img/temp-user-img.jpg';
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
      placeholder: "Compose an event post",
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
  renderUser = () => {
      switch (this.props.user) {
        case null:
          return "";

        default:
        return(
          <div className="user-col col s6 m6 l1 xl1">
            <div className="user-info">
              <div className="user-pic-wrapper">
                <img className="user-pic" src={this.props.user.avatar} width="64"/>
              </div>
                <p className="user-name">{this.props.user.displayName}</p>
                <p className="time">Dec 13, 2017</p>
            </div>
          </div>
        );
      }
  }

  render() {
    return (
      <div id="event-section-container" className="container">
        <div className="row" id="content-area-row">
        <div className="col l2 xl2">
          <Fixedmenu user={this.props.user?this.props.user:""}/>
        </div>
          <div id="event-editor-area" className="col s12 m12 l7 xl7">
            <div className="event-editor-area-wrapper">

              <div className="post-event-header">
                <h4>Create Event Post</h4>
              </div>

              <div className="post-event-body">
                <div className="event-header-wrapper">
                  <form id="event-header">
                    <input type="text"
                    value={this.state.header}
                    onChange={this.headerChange}
                    placeholder="Enter header for event here">
                    </input>
                  </form>
                </div>
                <div id="quill-area">
                  <div id="quill" />
                  <button id="saveDelta" className="btn" onClick={this.submitEvent}>SUBMIT</button>
                  <button id="saveDelta" className="btn" onClick={this.initEventPreview}>Preview</button>
                </div>
              </div>
            </div>
          </div>
          {this.renderUser()} {/* Here we are calling the renderUser function*/}
          {this.state.showPreview ? this.eventPreview(): ""}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {user: state.user}
}

export default connect(mapStateToProps)(ComposeEvent);
