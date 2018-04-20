import React, { Component } from "react";
import { Link } from "react-router-dom";
import ClassItem from "./ClassMenuComponents/ClassMenuItem";
import ClassList from "./ClassMenuComponents/ClassList";

class Fixedmenu extends Component {
  constructor(props) {
    super(props);
  }

  renderAdminActions = () => {
    return (
      <ul>
        <li>
          <a className="subheader">
            <i className="material-icons">call_to_action</i>
            ACTIONS
          </a>
        </li>
        <li>
          <Link
            className="waves-effect"
            onClick={this.props.close}
            to="/newNews"
          >
            <i className="material-icons">public</i>
            POST NEWS ITEM
          </Link>
        </li>
        <li>
          <Link
            className="waves-effect"
            onClick={this.props.close}
            to="/newEvent"
          >
            <i className="material-icons">event_note</i>
            POST EVENT ITEM
          </Link>
        </li>
        <li>
          <Link
            className="waves-effect"
            onClick={this.props.close}
            to="/newAlert"
          >
            <i className="material-icons">notifications_none</i>
            POST ALERT ITEM
          </Link>
        </li>

        <li>
          <Link className="waves-effect" onClick={this.props.close} to="/chat">
            <i className="material-icons">chat</i>
            CHAT TESTING
          </Link>
        </li>
        <li>
          <div className="divider" />
        </li>

        <li>
          <a className="subheader">
            <i className="material-icons">school</i>
            DEVELOPER TOOLS
          </a>
        </li>
        <li>
          <Link
            className="waves-effect"
            onClick={this.props.close}
            to="classDBInput"
          >
            INPUT NEW CLASS DB
          </Link>
        </li>
        <li>
          <Link
            className="waves-effect"
            onClick={this.props.close}
            to="/VerifyTeacher"
          >
            VERIFY TEACHER
          </Link>
        </li>
        <li>
          <Link
            className="waves-effect"
            onClick={this.props.close}
            to="/newClassSection"
          >
            CREATE A NEW CLASS SECTION
          </Link>
        </li>
      </ul>
    );
  };

  renderClassList = () => {
    return (
      <React.Fragment>
        <h4 className="myclassesheader">My Classes</h4>
        <div className="divider" />
        <div className="dropdown">
          <ClassList user={this.props.user} />
          <Link to="/selectClasses">Select Classes</Link>
        </div>
      </React.Fragment>
    );
  };
  renderMenu = () => {
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
  };

  render() {
    return (
      <div id="fixedmenu">
        <div className="fixedmenu-wrapper">{this.renderMenu()}</div>
      </div>
    );
  }
}

export default Fixedmenu;
