import React, { Component } from "react";
import { connect } from "react-redux";
import AlertSection from "./AlertSection";
import Fixedmenu from "./Fixedmenu";
import Quill from "quill";
import axios from "axios";
import marked from "marked";
import * as M from 'materialize-css';

class ComposeNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quill: null,
      quillDelta: null,
      deltaMarkup: "",
      header: "",
      showPreview: false,
      profile: null,
      facebook: "",
      twitter: "",
      instagram: "",
      linkedIn: "",
      gitHub: ""
    };
  }

  redirectBack = () => {
      this.props.history.push("/")
  }

  quillMarkup = () => {
    let rawMarkup = marked(this.state.deltaMarkup.toString());
    return { __html: rawMarkup };
  };

  newsPreview = () => {
    return (
      <div id="preview" className="col s12 m12 l8 lx8">
        <span dangerouslySetInnerHTML={this.quillMarkup()} />
      </div>
    );
  };

  showNewsPreview = e => {
    e.preventDefault();
    this.setState({ showPreview: !this.state.showPreview });
  };


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
      placeholder: "Compose a news post",
      theme: "snow"
    });
    //Saving the Quill object in to the state
    this.loadProfile();
    this.setState({ quill: quillInit });
  }

  loadProfile = () => {
    if(this.props.user){
      axios.get(`${"/api/user-profile"}/${this.props.user._id}`).then(res => {
      this.setState({profile: res.data}, this.mapSocialMediaLinks);
    });
    } else{
      setTimeout(this.loadProfile, 100);
    }
  }

  headerChange = e => {
    e.preventDefault();
    this.setState({ header: e.target.value });
  };

  submitNews = () => {
    //Grabs the delta from the quill state object
    let delta = this.state.quill.getContents();
    //Grabs the HTML from whithin the Quill edditor
    let quill_innerHTML = document.getElementsByClassName("ql-editor")[0]
      .innerHTML;
    //Sets the states and calls upload news after
    this.setState(
      { deltaMarkup: quill_innerHTML, quillDelta: delta },
      this.uploadNews
    );
  };

  uploadNews = () => {
    if(this.state.header){
      let newsPost = {
      author: this.props.user.displayName,
      user_id: this.props.user._id,
      avatar: this.props.user.avatar,
      title: this.state.header,
      delta: this.state.quillDelta,
      preview: this.state.deltaMarkup
    };
    axios.post("api/feed/news-post", newsPost).catch(err => {
      console.error(err);
    }).then(this.redirectBack())
  } else {
    M.toast({html: "Header is Empty"});
  }
  };
  mapSocialMediaLinks = () => {
    let { social_media } = this.state.profile;
    let {
      facebook,
      twitter,
      instagram,
      linkedIn,
      gitHub
    } = this.state.profile.social_media;
    if (social_media.facebook) {
      facebook = (
        <div id="facebook-link">
          <a href={social_media.facebook} style={{ color: "#01579b" }}>
            <i className="fab fa-facebook-square" />
          </a>
        </div>
      );
    }
    if (social_media.twitter) {
      twitter = (
        <div id="twitter-link">
          <a href={social_media.twitter} style={{ color: "#03a9f4" }}>
            <i className="fab fa-twitter-square" />
          </a>
        </div>
      );
    }
    if (social_media.instagram) {
      instagram = (
        <div id="instagram-link">
          <a href={social_media.instagram} style={{ color: "#d81b60" }}>
            <i className="fab fa-instagram" />
          </a>
        </div>
      );
    }
    if (social_media.linkedIn) {
      linkedIn = (
        <div id="linkedIn-link">
          <a href={social_media.linkedIn} style={{ color: "#2196f3" }}>
            <i className="fab fa-linkedin" />
          </a>
        </div>
      );
    }
    if (social_media.gitHub) {
      gitHub = (
        <div id="gitHub-link">
          <a href={social_media.gitHub} style={{ color: "#424242" }}>
            <i className="fab fa-github-square" />
          </a>
        </div>
      );
    }
    this.setState({
      facebook: facebook,
      twitter: twitter,
      instagram: instagram,
      linkedIn: linkedIn,
      gitHub: gitHub
    });
  };

  renderSocialMediaLinks = () => {
    return (
      <div className="social-media-links">
        {this.state.facebook}
        {this.state.twitter}
        {this.state.instagram}
        {this.state.linkedIn}
        {this.state.gitHub}
      </div>
    );
  };

  renderUser = () => {
    switch (this.state.profile) {
      case null:
        return "";

      default:
        return (
          <div className="user-col col l3 xl3">
              <div className="profile-left-section z-depth-2">
                <div className="profile-avatar">
                  <img className="" src={this.state.profile.avatar} />
                </div>
                {this.renderSocialMediaLinks()}
                <div className="divider"/>
                <div className="profile-contact-info">
                  <p>{this.state.profile.displayName}</p>
                  <div id="profile-contact-info">
                    <h6>Contact Info</h6>
                    <p>Email: {this.state.profile.email}</p>
                    <p>Phone: {this.state.profile.phone?this.state.profile.phone:"(555) 555-5555"}</p>
                    <p>Address: {this.state.profile.address?this.state.profile.address: "Generic # generic blvd"}</p>
                  </div>
                </div>
              </div>
          </div>
        );
    }
  };

  render() {
    return (
      <div id="event-section-container" className="container">
        <div className="row" id="content-area-row">
          <div className="col s2 m2 l2 xl2">
            <Fixedmenu user={this.props.user ? this.props.user : ""} />
          </div>
          <div id="event-editor-area" className="col s12 m12 l7 xl7">
            <div className="event-editor-area-wrapper">
              <div className="post-news-header">
                <h4>Create News Post</h4>
              </div>
              <div className="post-event-body">
                <div className="event-header-wrapper">
                  <form id="event-header">
                    <input
                      type="text"
                      value={this.state.header}
                      onChange={this.headerChange}
                      required
                      placeholder="Enter header here"
                    />
                  </form>
                </div>
                <div id="quill-area">
                  <div id="quill" />
                  <button
                    id="saveDelta"
                    className="btn"
                    onClick={this.submitNews}
                  >
                    SUBMIT
                  </button>

                </div>
              </div>
            </div>
          </div>
          {this.renderUser()} {/* Here we are calling the renderUser function*/}
          {this.state.showPreview ? this.newsPreview() : ""}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(ComposeNews);
