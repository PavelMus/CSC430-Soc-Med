import React, { Component } from "react";
import { connect } from "react-redux";
import Student from "./SidenavStudent";
import Teacher from "./SidenavTeacher";
import Admin from "./SidenavAdmin";
import AdminTeacher from "./SidenavAdminTeacher";
import * as actions from "../../actions";
import * as M from "materialize-css";

class Sidenav extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchClasses(this.props.id);
    this.props.fetchTeachers();
    this.props.fetchAdmins();
  }

  renderContent = () => {
    if (this.props.admins && this.props.teachers) {
      let user = this.props;
      if (user.admin && user.teacher) {
        return (
          <AdminTeacher
            user={this.props}
            admins={this.props.admins}
            teachers={this.props.teachers}
          />
        );
      } else if (user.admin) {
        return (
          <Admin
            user={this.props}
            admins={this.props.admins}
            teachers={this.props.teachers}
          />
        );
      } else if (user.teacher) {
        return (
          <Teacher
            user={this.props}
            admins={this.props.admins}
            teachers={this.props.teachers}
          />
        );
      } else
        return <Student user={this.props} teachers={this.props.teachers} />;
    }
  };

  render() {
    let user = this.props;
    return (
      <ul id="slide-out" className="sidenav">
        <li>
          <div className="user-view">
            <div className="background" id="sidenav-background" />
            <a href="#!user">
              <img className="circle" src={user.avatar} alt="user avatar" />
            </a>
            <a href="#!name">
              <span className="black-text name">{user.name}</span>
            </a>
            <a href="#!email">
              <span className="white-text email">{user.email}</span>
            </a>
          </div>
        </li>
        {this.renderContent()}
        <li>
          <a href="/api/logout">Logout</a>
        </li>
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    classes: state.classes,
    teachers: state.teachers,
    admins: state.admins
  };
};

export default connect(mapStateToProps, actions)(Sidenav);
