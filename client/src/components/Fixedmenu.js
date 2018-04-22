import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import ClassItem from "./ClassMenuComponents/ClassMenuItem";
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
            className="waves-effect hoverable"
            onClick={this.props.close}
            to="/newNews"
          >
          <i className="material-icons">public</i>
            <span className="action">Post News Item</span>
          </Link>
        </li>
        <li>
          <Link
            className="waves-effect hoverable"
            onClick={this.props.close}
            to="/newEvent"
          >
            <i className="material-icons">event_note</i>
            <span>Post Event Item</span>
          </Link>
        </li>
        <li>
          <Link
            className="waves-effect hoverable"
            onClick={this.props.close}
            to="/newAlert"
          >
            <i className="material-icons">notifications_none</i>
            <span>Post Alert Item</span>
          </Link>
        </li>

        <li>
          <Link className="waves-effect hoverable" onClick={this.props.close} to="/chat">
            <i className="material-icons">chat</i>
            <span>Chat Testing</span>
          </Link>
        </li>
        <li>
          <div className="divider"></div>
        </li>

        <li>
          <a className="subheader">

            <span>Admin Tools</span>
          </a>
        </li>
        <li>
          <Link
            className="waves-effect hoverable"
            onClick={this.props.close}
            to="classDBInput"
          >
            <i className="material-icons">input</i>
            Input New Class
          </Link>
        </li>
        <li>
          <Link
            className="waves-effect hoverable"
            onClick={this.props.close}
            to="/VerifyTeacher"
          >
            <i className="material-icons">verified_user</i>
            Verify Teacher
          </Link>
        </li>
        <li>
          <Link
            className="waves-effect hoverable"
            onClick={this.props.close}
            to="/newClassSection"
          >
            <i className="material-icons">create_new_folder</i>
              <div>
                <span className="item-overflow">Create New Class Section</span>

              </div>
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

              <Link className="select-class hoverable" to="/selectClasses">
                <i className="material-icons">vertical_align_bottom</i>
              <span>Select Classes</span>
              </Link>

          </div>
        </div>
      </React.Fragment>
    );
  };
  renderMenu = () => {
    if (this.props.user == null || this.props.classes == null) {
    } else {
      let user = this.props.user;
      if (!(user.admin && user.teacher)) {
        return this.renderClassList();
      } else if (user.admin && user.teacher) {
        return (
          <React.Fragment>
            {this.renderClassList()}
            {this.renderAdminActions()}
          </React.Fragment>
        );
      } else if (user.admin) {
        return this.renderAdminActions();
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
