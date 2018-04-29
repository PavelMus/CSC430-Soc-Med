import React, { Component } from "react";
import { connect } from "react-redux";
import FixedMenu from "./Fixedmenu";
import axios from "axios";
import * as M from "materialize-css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edditable: false,
      profile: "",
      user_status: "",
      facebook: "",
      twitter: "",
      instagram: "",
      linkedIn: "",
      gitHub: "",
      tooltip_avatar: "",
      social_media_eddit: "",
      social_media_eddit_tooltip: ""
    };
  }

  componentDidMount() {
    this.checkUser();
    this.loadUserProfile();
    this.initTooltips();
    this.initSocialMediaEddit();
  }

  edditPicture = (e) => {
    e.preventDefault();

  }

  checkUser = () => {
    if (this.props.user == null) {
      setTimeout(this.checkUser, 100);
    } else {
      let url_id = this.props.location.pathname.slice(9);
      if (this.props.user._id === url_id) {
        this.setState({ edditable: true });
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
        position: "left"
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

  loadUserProfile = () => {
    let url_id = this.props.location.pathname.slice(9);
    axios.get(`${"/api/user-profile"}/${url_id}`).then(res => {
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
            <i class="fab fa-facebook-square" />
          </a>
        </div>
      );
    }
    if (social_media.twitter) {
      twitter = (
        <div id="twitter-link">
          <a href={social_media.twitter} style={{ color: "#03a9f4" }}>
            <i class="fab fa-twitter-square" />
          </a>
        </div>
      );
    }
    if (social_media.instagram) {
      instagram = (
        <div id="instagram-link">
          <a href={social_media.instagram} style={{ color: "#d81b60" }}>
            <i class="fab fa-instagram" />
          </a>
        </div>
      );
    }
    if (social_media.linkedIn) {
      linkedIn = (
        <div id="linkedIn-link">
          <a href={social_media.linkedIn} style={{ color: "#2196f3" }}>
            <i class="fab fa-linkedin" />
          </a>
        </div>
      );
    }
    if (social_media.gitHub) {
      gitHub = (
        <div id="gitHub-link">
          <a href={social_media.gitHub} style={{ color: "#424242" }}>
            <i class="fab fa-github-square" />
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

  renderSocialMediaEddit = () => {
    return (
      <div id="edit-social-media-links" className="fixed-action-btn">
        <a id="social-media-eddit-button"className="btn-floating btn blue darken-4">
          <i className="large material-icons">mode_edit</i>
        </a>
        <ul>
          <li>
            <a className="btn-floating btn-small grey darken-3">
              <i class="fab fa-github" />
            </a>
          </li>
          <li>
            <a className="btn-floating btn-small pink darken-1">
              <i class="fab fa-instagram" />
            </a>
          </li>
          <li>
            <a className="btn-floating btn-small light-blue">
              <i class="fab fa-twitter" />
            </a>
          </li>
          <li>
            <a className="btn-floating btn-small blue">
              <i class="fab fa-linkedin-in" />
            </a>
          </li>
          <li>
            <a className="btn-floating btn-small light-blue darken-4">
              <i class="fab fa-facebook-f" />
            </a>
          </li>
        </ul>
      </div>
    );
  };

  renderProfile = () => {
    switch (this.state.profile) {
      case null:
        return "";
      default:
        let profile = this.state.profile;
        return (
          <div className="row profile-container">
            <div className="col s3 m4">
            <div className="profile-left-section z-depth-3">
              <div className="profile-avatar">
                <img className="" src={profile.avatar} />
                {this.state.edditable ? (
                  <a
                    id="edit-user-avatar"
                    className="btn-floating btn-small waves-effect waves-light"
                  >
                    <i className="material-icons">add</i>
                  </a>
                ) : (
                  ""
                )}
              </div>
              {this.renderSocialMediaLinks()}
              <div className="social-media-FAB">
                {this.state.edditable ? this.renderSocialMediaEddit() : ""}
              </div>
              <div className="profile-contact-info">
                <p>{profile.displayName}</p>
                {this.renderUserStatus()}
                <p>Majoring in: {profile.major}</p>
                <div id="profile-contact-info">
                  <h6>Contact Info</h6>
                  <p>Email: {profile.email}</p>
                  <p>Phone: </p>
                  <p>Address: </p>
                </div>
              </div>
            </div>
            </div>
            <div className="col s9 m8">
              <div className="profile-name">
              <h5>
                {profile.displayName} ({this.renderUserStatus()})
              </h5>
            </div>
            <div className="bio">
                <h6>Bio</h6>
            </div>
            <div className="resume">
                resume
            </div>
            <div className="research">
                research
            </div>
            <div className="projects">
                projects
            </div>
            
            </div>
            
          </div>
        );
    }
  };
  renderUserStatus = () => {
    let user = this.state.profile;
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
