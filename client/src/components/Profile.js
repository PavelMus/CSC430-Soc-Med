import React, { Component } from "react";
import { connect } from "react-redux";
import FixedMenu from "./Fixedmenu";
import axios from "axios";
import * as M from "materialize-css";
import uuid from 'uuid';

const initialState = {
      edditable: false,
      profile: "",
      profile_classes: "",
      user_status: "",
      facebook: "",
      twitter: "",
      instagram: "",
      linkedIn: "",
      gitHub: "",
      tooltip_avatar: "",
      social_media_eddit: "",
      social_media_eddit_tooltip: "",
      new_picture_url: "",
      new_social_media_url: "",
      new_social_media_url_flag: ""
}
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.location.pathname !== nextProps.location.pathname){
      this.setState(initialState, this.initComponent);
    }
  }

  componentDidMount() {
    this.initComponent();
  }

  initComponent = () => {
    this.checkUser();
    this.loadUserProfile(this.props.location.pathname);
    this.initTooltips();
    this.initSocialMediaEddit();
  }

  edditPicture = e => {
    e.preventDefault();
  };

  checkUser = () => {
    if (this.props.user == null) {
      setTimeout(this.checkUser, 100);
    } else {
      let url_id = this.props.location.pathname.slice(9);
      if (this.props.user._id === url_id) {
        this.setState({ edditable: true, 
          user_status: {admin: this.props.user.admin,
            teacher: this.props.user.teacher}});
      } else {
        this.setState({ user_status: {admin: this.props.user.admin,
            teacher: this.props.user.teacher}});
      }
    }
  };

  initSocialMediaEddit = () => {
    let elem = document.getElementById("edit-social-media-links");
    if (elem) {
      let instance = M.FloatingActionButton.init(elem, {
        direction: "right",
        hoverEnabled: false,
        toolbarEnabled: false
      });
      this.setState({ social_media_eddit: instance });
    } else {
      setTimeout(this.initSocialMediaEddit, 50);
    }
  };

  initTooltips = () => {
    let edit_avatar = document.getElementById("edit-user-avatar");
    let edit_soc_med = document.getElementById("social-media-eddit-button");
    if (edit_avatar && edit_soc_med) {
      let instance = M.Tooltip.init(edit_avatar, {
        html: "Edit Picture",
        position: "top"
      });
      let instance1 = M.Tooltip.init(edit_soc_med, {
        html: "Edit Social Media links",
        position: "top"
      });
      this.setState({
        tooltip_avatar: instance,
        social_media_eddit_tooltip: edit_soc_med
      });
    } else {
      setTimeout(this.initTooltips, 50);
    }
  };

  loadUserProfile = url => {
    let url_id = url.slice(9);
    axios.get(`${"/api/user-profile"}/${url_id}`).then(res => {
      console.log(res.data);
      
      this.setState({ profile: res.data }, this.mapSocialMediaLinks);
    });
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
    }, this.mapProfileClasses);
  };

  mapProfileClasses = () => {
    let classes = this.state.profile.classes;
    console.log(classes);
    let profile_classes = <div className="current-classes-body">
    {classes.map(_class => {
      return (
        <ul className="current-class-body" key={uuid()}>
        <li className="profile_class_type">{_class.type}{_class.level}</li>
        <li className="profile_class_subject">{_class.subject}</li>
        <li className="profile_class_description">{_class.description}</li>
        </ul>
      );
    })}
    </div>;
    this.setState({profile_classes: profile_classes});
  }

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

  renderSocialMediaEdditButton = () => {
    return (
      <div id="edit-social-media-links" className="fixed-action-btn">
        <a
          id="social-media-eddit-button"
          className="btn-floating btn blue darken-4"
        >
          <i className="large material-icons">mode_edit</i>
        </a>
        <ul>
          <li>
            <a
              target="gitHub"
              onClick={this.changeSocialMediaLink}
              className="btn-floating btn-small grey darken-3"
            >
              <i className="fab fa-github" />
            </a>
          </li>
          <li>
            <a
              target="instagram"
              onClick={this.changeSocialMediaLink}
              className="btn-floating btn-small pink darken-1"
            >
              <i className="fab fa-instagram" />
            </a>
          </li>
          <li>
            <a
              target="twitter"
              onClick={this.changeSocialMediaLink}
              className="btn-floating btn-small light-blue"
            >
              <i className="fab fa-twitter" />
            </a>
          </li>
          <li>
            <a
              target="linkedIn"
              onClick={this.changeSocialMediaLink}
              className="btn-floating btn-small blue"
            >
              <i className="fab fa-linkedin-in" />
            </a>
          </li>
          <li>
            <a
              target="facebook"
              onClick={this.changeSocialMediaLink}
              className="btn-floating btn-small light-blue darken-4"
            >
              <i className="fab fa-facebook-f" />
            </a>
          </li>
        </ul>
      </div>
    );
  };

  showPictureInput = e => {
    e.preventDefault();
    let elem = document.getElementById("edit-user-avatar-input");
    if (elem.classList.contains("scale-in")) {
      elem.classList.remove("scale-in");
    } else {
      elem.classList.add("scale-in");
    }
  };

  onPictureUrlChange = e => {
    this.setState({ new_picture_url: e.target.value });
  };
  onSocialMediaUrlChange = e => {
    this.setState({ new_social_media_url: e.target.value });
  };

  uploadUpdatedPicture = e => {
    if (e.key === "Enter") {
      let new_url = this.state.new_picture_url;
      axios
        .put(`${"/api/profile-update-picture"}/${this.state.profile._id}`, {
          new_url: new_url
        })
        .then(res => {
          M.toast({ html: res.data.message });
          this.setState({ new_picture_url: "" });
          this.loadUserProfile();
        });
    }
  };

  changeSocialMediaLink = e => {
    //e.preventDefault();
    if (e.target.target) {
      let elem = document.getElementById("social-media-edit-input");
      if (elem.classList.contains("scale-in")) {
        elem.classList.remove("scale-in");
        this.setState({ new_social_media_url_flag: "" });
      } else {
        elem.classList.add("scale-in");
        elem.firstChild.placeholder = e.target.target + " url";
        this.setState({ new_social_media_url_flag: e.target.target });
      }
    } else {
      let elem = document.getElementById("social-media-edit-input");
      if (elem.classList.contains("scale-in")) {
        elem.classList.remove("scale-in");
        this.setState({ new_social_media_url_flag: "" });
      } else {
        elem.classList.add("scale-in");
        elem.firstChild.placeholder = e.target.parentNode.target + " url";
        this.setState({
          new_social_media_url_flag: e.target.parentNode.target
        });
      }
    }
  };

  uploadUpdatedSocialMediaUrl = e => {
    e.preventDefault();
    let new_url = this.state.new_social_media_url;

    if(new_url.slice(0, 6) !== "https://" || new_url.slice(0, 5) !== "http://"){
      new_url = "https://" + new_url;
    }

    axios
      .put(
        `${"/api/profile-update-social-media-url"}/${this.state.profile._id}/${
          this.state.new_social_media_url_flag
        }`,
        { new_url: new_url }
      )
      .then(res => {
        M.toast({html: res.data.message});
        this.setState({new_social_media_url: "", new_social_media_url_flag: ""});
        let elem = document.getElementById("social-media-edit-input");
        elem.classList.remove("scale-in");
        this.loadUserProfile(this.props.location.pathname);
      });
  };

  renderProfile = () => {
    switch (this.state.profile) {
      case null:
        return "";
      default:
        let profile = this.state.profile;
        return (
          <div className="row profile-container">
            <div className="col xs12 s12 m4 l3 xl3">
              <div className="profile-left-section z-depth-2">
                <div className="profile-avatar">
                  <img className="" src={profile.avatar} />
                  <input
                    id="edit-user-avatar-input"
                    value={this.state.new_picture_url}
                    onChange={this.onPictureUrlChange}
                    onKeyPress={this.uploadUpdatedPicture}
                    className="z-depth-1 scale-transition scale-out"
                    placeholder="Enter Url"
                  />
                  {this.state.edditable ? (
                    <a
                      id="edit-user-avatar"
                      className="btn-floating btn-small waves-effect waves-light"
                      onClick={this.showPictureInput}
                    >
                      <i className="material-icons">add</i>
                    </a>
                  ) : (
                    ""
                  )}
                </div>
                {this.renderSocialMediaLinks()}
                {this.state.edditable?
                  <div className="social-media-FAB">
                    {this.renderSocialMediaEdditButton()}
                    <div
                      id="social-media-edit-input"
                      className="scale-transition scale-out"
                    >
                      <input
                        value={this.state.new_social_media_url}
                        onChange={this.onSocialMediaUrlChange}
                        placeholder="Url"
                      />
                      <button
                        onClick={this.uploadUpdatedSocialMediaUrl}
                        className="btn-small"
                      >
                        <i className="material-icons">send</i>
                      </button>
                    </div>
                  </div>:""}
                <div className="divider"/>
                <div className="profile-contact-info">
                  <p>{profile.displayName}</p>
                  {this.renderUserStatus()}
                  <p>Majoring in: Computer Science{profile.major}</p>
                  <div id="profile-contact-info">
                    <h6>Contact Info</h6>
                    <p>Email: {profile.email}</p>
                    <p>Phone: 646-879-4222</p>
                    <p>Address: <span>72 Herberton ave</span></p>
                  </div>
                </div>
              </div>
            </div>
            <div id="profile-content" className="col xs12 s12 m8 l9 xl9">
              <div className="profile-name">
                <div className="profile-name-header">
                  <h5>
                    {profile.displayName} 
                    ({this.renderUserStatus()})
                  </h5>
                </div>
              </div>
              <div className="profile-right-section ">

                    <div className="bio z-depth-2">
                      <div className="bio-header">
                        <h6>Bio</h6>
                      </div>
                      <ul className="bio-ul">
                        <li className="bio-li">
                          <h4 className="bio-li-header">About Me:</h4>
                          <p> Hello, fellow students and Classmates. As you may know I'm Aaron and im a computer science major. I enjoy talking to people. I love to iquire about people way of life and to see their perspective on things.</p>
                        </li>
                        <li className="bio-li">
                          <h4 className="bio-li-header">Interests:</h4>
                          <p> Music Production, Coding, Reading, Basketball</p>
                        </li>
                        <li className="bio-li">
                          <h4 className="bio-li-header">Skills:</h4>
                          <p> Html,CSS & Javascript, C++, Java, Swift</p>
                        </li>
                      </ul>
                    </div>

                <div className="resume-research-projects">

                  <div className="resume z-depth-2">
                    <div className="reusable-header">
                      <h6>Resume</h6>
                    </div>
                    <div className="resume-research-projects-body">
                      <a href="">{profile.displayName}'s Resume</a>
                    </div>
                  </div>
                  <div className="research z-depth-2">
                    <div className="reusable-header">
                      <h6>Research</h6>
                    </div>
                    <div className="resume-research-projects-body">
                      <ul>
                        <li>
                          <a href="">Maching learning Research</a>
                        </li>
                        <li>
                          <a href="">Resume</a>
                        </li>
                      </ul>

                    </div>

                  </div>
                  <div className="projects z-depth-2">
                    <div className="reusable-header">
                      <h6>Projects</h6>
                    </div>
                    <div className="resume-research-projects-body">
                      <ul>
                        <li>
                          <a href="">College Social Media Site</a>
                        </li>
                        <li>
                          <a href="">Ecommerce Site</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
              <div className="current-classes z-depth-2">
                <div className="reusable-header">
                  <h6>Aaron's Current Classes</h6>
                </div>
                {this.state.profile_classes}
              </div>
            </div>
          </div>
        );
    }
  };
  renderUserStatus = () => {
    let user = this.state.user_status;
    if (user.admin) {
      return <p>Administrator</p>;
    } else if (user.teacher) {
      return <p>Professor</p>;
    } else {
      return <p>Student</p>;
    }
  };

  render() {
    return (
      <div id="content-section-container" className="container">
        <div className="row" id="content-area-row">
          <div className="col m2 l2 xl2 hide-on-med-and-down">
            <FixedMenu />
          </div>
          <div className="col s12 m10 l10 xl10">{this.renderProfile()}</div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(Profile);
