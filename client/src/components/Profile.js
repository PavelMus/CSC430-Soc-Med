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
      facebook: "",
      twitter: "",
      instagram: "",
      linkedIn: "",
      gitHub: "",
      tooltip_avatar: "",
      social_media_eddit: ""
    };
  }

  componentDidMount() {
    this.checkUser();
    this.loadUserProfile();
    this.initTooltips();
    this.initSocialMediaEddit();
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
        toolbarEnabled: true
      });
      this.setState({ social_media_eddit: instance });
    } else {
      setTimeout(this.initSocialMediaEddit, 200);
    }
  };

  initTooltips = () => {
    let elem = document.getElementById("edit-user-avatar");
    if (elem) {
      let instance = M.Tooltip.init(elem, {
        html: "Edit Picture",
        position: "left"
      });
      this.setState({ tooltip_avatar: instance });
    } else {
      setTimeout(this.initTooltips, 200);
    }
  };

  loadUserProfile = () => {
    let url_id = this.props.location.pathname.slice(9);
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
        <div className="facebook-link">
          <a href={social_media.facebook}>
            <i class="fab fa-facebook-square" />
          </a>
        </div>
      );
    }
    if (social_media.twitter) {
      twitter = (
        <div className="twitter-link">
          <a href={social_media.twitter}>
            <i class="fab fa-twitter-square" />
          </a>
        </div>
      );
    }
    if (social_media.instagram) {
      instagram = (
        <div className="instagram-link">
          <a href={social_media.instagram}>
            <i class="fab fa-instagram" />
          </a>
        </div>
      );
    }
    if (social_media.linkedIn) {
      linkedIn = (
        <div className="linkedIn-link">
          <a href={social_media.linkedIn}>
            <i class="fab fa-linkedin" />
          </a>
        </div>
      );
    }
    if (social_media.gitHub) {
      gitHub = (
        <div className="gitHub-link">
          <a href={social_media.gitHub}>
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
        {this.state.edditable ? (
          <div id="edit-social-media-links" className="fixed-action-btn toolbar">
            <a className="btn-floating btn-large red">
              <i className="large material-icons">mode_edit</i>
            </a>
            <ul>
              <li>
                <a className="btn-floating red">
                  <i className="material-icons">insert_chart</i>
                </a>
              </li>
              <li>
                <a className="btn-floating yellow darken-1">
                  <i className="material-icons">format_quote</i>
                </a>
              </li>
              <li>
                <a className="btn-floating green">
                  <i className="material-icons">publish</i>
                </a>
              </li>
              <li>
                <a className="btn-floating blue">
                  <i className="material-icons">attach_file</i>
                </a>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
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
          <div className="profile-container">
            <div className="profile-left-section">
              <div className="profile-avatar z-depth-3">
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
              <div className="divider" />
              {this.renderSocialMediaLinks()}
              <div className="profile-contact-info" />
            </div>

            <div className="profile-name">
              <h5>{profile.displayName}</h5>
            </div>
            <div />
          </div>
        );
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
