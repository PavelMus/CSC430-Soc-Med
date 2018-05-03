import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import ClassList from "./ClassMenuComponents/ClassList";

class Fixedmenu extends Component {
  constructor(props) {
    super(props);
  }
  renderAdminActions = () => {
    return (
      <ul className="action-list">
        <li className="header-li">
          <a className="subheader">
            <span className="actions-header">Actions</span>
          </a>
        </li>
        <li>

          <Link
            className="waves-effect menu-hoverable"
            onClick={this.props.close}
            to="/newNews"
          >
          <i className="material-icons news-post">public</i>
            <span className="action">Post News Item</span>
          </Link>
        </li>
        <li>
          <Link
            className="waves-effect menu-hoverable"
            onClick={this.props.close}
            to="/newEvent"
          >
            <i className="material-icons event-post">event_note</i>
            <span>Post Event Item</span>
          </Link>
        </li>
        <li>
          <Link
            className="waves-effect menu-hoverable"
            onClick={this.props.close}
            to="/newAlert"
          >
            <i className="material-icons alert-icon">notifications_none</i>
            <span>Post Alert Item</span>
          </Link>
        </li>

        <li className="header-li">
          <a className="subheader">

            <span>Admin Tools</span>
          </a>
        </li>
        <li>
          <Link
            className="admin-links waves-effect menu-hoverable"
            onClick={this.props.close}
            to="/classDBInput"
          >
            <i className="material-icons input-class-icon">input</i>
            <span>Input New Class</span>
          </Link>
        </li>
        <li>
          <Link
            className="admin-links waves-effect menu-hoverable"
            onClick={this.props.close}
            to="/VerifyTeacher"
          >
            <i className="material-icons verify-teacher-icon">verified_user</i>
            <span>Verify Teacher</span>
          </Link>
        </li>
        <li>
          <Link
            className="admin-links waves-effect menu-hoverable"
            onClick={this.props.close}
            to="/newClassSection"
          >
            <i className="material-icons createsection">create_new_folder</i>

                <span className="item-overflow">Create New Class Section</span>


          </Link>
        </li>
      </ul>
    );
  };

  renderClassList = () => {
    return (
      <React.Fragment>
        <h4 className="myclassesheader">Classes</h4>
        <div className="divider" />
        <div className="dropdown">
          <ClassList
          user={this.props.user}
          classes={this.props.classes}
          />
          <div>
            {!(this.props.user.teacher || this.props.user.admin)?
              <Link className="select-class menu-hoverable" to="/selectClasses">
                <i className="material-icons">vertical_align_bottom</i>
              <span>Select Classes</span>
              </Link>:
              ""
            }
          </div>
        </div>
      </React.Fragment>
    );
  };
  renderMenu = () => {
    if (this.props.user == null || this.props.classes == null) {
    } else {
      let user = this.props.user;
      if (!user.admin && !user.teacher) {
        return this.renderClassList();
      } else if (user.admin && user.teacher) {
        return (
          <React.Fragment>
            {this.renderClassList()}
            {this.renderAdminActions()}
          </React.Fragment>
        );
      } else if (user.admin) {
        return (
          <React.Fragment>
          {this.renderAdminActions()}
          </React.Fragment>
        );
      } else if (user.teacher) {
        return this.renderClassList();
      }
    }
  };

  render() {
    return (
      <div id="fixedmenu">
        <div className="fixedmenu-wrapper">
          {this.renderMenu()}
        </div>
      </div>
    );
  }
}

var mapStateToProps = state => {
  return { user: state.user, classes: state.classes };
};

export default withRouter(connect(mapStateToProps)(Fixedmenu));
