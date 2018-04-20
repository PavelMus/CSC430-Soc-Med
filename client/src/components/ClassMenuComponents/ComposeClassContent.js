import React, { Component } from "react";
import Quill from "quill";

export default class ComposeClassContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        quill: ""
    }
  }

  componentDidMount() {
    //Setting up the Quill toolbar options
    let toolbarOptions = [
      ["bold", "italic", "underline", "strike"],
      ["blockquote"],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ size: [] }],
      ["link", "image", "video"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }]
    ];
    //Initializing Quill state object
    let quillInit = new Quill("#quill", {
      modules: {
        toolbar: toolbarOptions
      },
      placeholder: "Compose new post",
      theme: "snow"
    });
    //Saving the Quill object in to the state
    this.setState({ quill: quillInit });
  }



  render() {
    return <div />;
  }
}
