import React, { Component } from "react";
import Leftsection from "./Leftsection";
import Rightsection from "./Rightsection";
import Quill from "quill";

class ComposeEvent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let toolbarOptions = [
      ["bold", "italic", "underline", "strike"],
      ["blockquote"],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }][
        { size: ["small", false, "large", "huge"] }
      ],
      ["link", "image", "video"],
      [{ color: [] }, { background: [] }]
    ];
    var quill = new Quill("#quill", {
      modules: {
        toolbar: toolbarOptions
      },
      theme: "snow"
    });
  }
  renderQuill = () => {
    let toolbarOptions = [
      ["bold", "italic", "underline", "strike"],
      ["blockquote"],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }][
        { size: ["small", false, "large", "huge"] }
      ],
      ["link", "image", "video"],
      [{ color: [] }, { background: [] }]
    ];
    var quill = new Quill("#quill", {
      modules: {
        toolbar: toolbarOptions
      },
      theme: "snow"
    });
    return "";
  };

  render() {
    return (
      <div id="event-section-container" className="container">
        <div className="row" id="content-area-row">
          <div className="middle-right-section col s12 m12 l12 xl12">
            <div id="quill" className="" />
            <Rightsection />
          </div>
        </div>
      </div>
    );
  }
}

export default ComposeEvent;
