import React, { Component } from "react";
import Leftsection from "../Leftsection";
import Rightsection from "../Rightsection";
import FeedPost from './FeedPost';
import Loading from '../Loading'
import axios from 'axios';
import Quill from 'quill';

class FeedItem extends Component {
    constructor(props) {
        super(props);
    this.state = {
        feedItem: false,
        quill: ""
    }
}

renderContent = () =>{
  
}

initQuill = () =>{
  if(this.state.feedItem == null){

  }
  else {
  let post = this.state.feedItem.feedItem;
  console.log(this.state.feedItem);
  
  let quillInit = new Quill("#quill", {
    modules: {
      toolbar: false
    },
    readOnly: true,
    theme: "snow"
  });
  quillInit.setContents(post.delta);
  this.setState({quill: quillInit});
}
}

componentDidMount(){
  axios.get(`${"/api"}${this.props.location.pathname}`)
  .then( res =>{
      this.setState({feedItem: res.data}, this.initQuill);
    });
}

  render() {
    return (
      <div id="content-section-container" className="container">
        <div className="row" id="content-area-row">
          <div className="Leftsection col s12 m12 l3 xl3">
            <div>
              
            </div>
          </div>
          <div className="middle-right-section col s12 m12 l9 xl9">
            <div id="quill">
                {this.state.feedItem ? this.renderContent() : ""}
            </div>
          <Rightsection />

          </div>
        </div>
      </div>
    );
  }
}

export default FeedItem;
