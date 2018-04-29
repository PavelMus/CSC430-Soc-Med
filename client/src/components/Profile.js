import React, { Component } from "react";
import { connect } from "react-redux";
import FixedMenu from "./Fixedmenu";
import axios from 'axios';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edditable: false,
      profile: ""
    };
  }

  componentDidMount() {
    this.checkUser();
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

  loadUserProfile = () => {
    let url_id = this.props.location.pathname.slice(9);
      axios.get(`${"/api/user-profile"}/${url_id}`).then(res => {
          this.setState({profile: res.data});
      });
  }

  renderProfile = () => {
    switch (this.state.profile) {
      case null:
        return "";
      default:
        let profile = this.state.profile;
        return (
          <div className="profile-container">
            <img className="circle" src={profile.avatar} />
            <h5>{profile.displayName}</h5>
          </div>
        );
    }
  };
  render() {
    return (
      <div id="content-section-container" className="container">
        <div className="row" id="content-area-row">
          <div className="col m2 l2 xl2">
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
