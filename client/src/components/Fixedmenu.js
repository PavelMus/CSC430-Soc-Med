import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import ClassItem from "./ClassMenuComponents/ClassMenuItem";
import ClassList from "./ClassMenuComponents/ClassList";

//Below we have the corresopding icons for each type of class
// Accounting ACC icon = account_balance
// Business BUS 160 = business_center
// English 111 = mode_edit
// Astronomy AST 120 = wb_sunny
// Biology BIO 170 = accessibility
// History COR 100 = history
// Computer Science CSC 126 = code
// Math MTH = add_box
class Fixedmenu extends Component {
  constructor(props) {
    super(props);
  }

  renderAdminActions = () => {
    return (
      <ul className="action-list">
        <li className="header-li">
          <a className="subheader">
            <i className="material-icons">call_to_action</i>
            <span className="actions">ACTIONS</span>
          </a>
        </li>
        <li>
                    <i className="material-icons">public</i>
          <Link
            className="waves-effect"
            onClick={this.props.close}
            to="/newNews"
          >

            <span className="action">POST NEWS ITEM</span>
          </Link>
        </li>
        <li>
          <Link
            className="waves-effect"
            onClick={this.props.close}
            to="/newEvent"
          >
            <i className="material-icons">event_note</i>
            <span>POST EVENT ITEM</span>
          </Link>
        </li>
        <li>
          <Link
            className="waves-effect"
            onClick={this.props.close}
            to="/newAlert"
          >
            <i className="material-icons">notifications_none</i>
            <span>POST ALERT ITEM</span>
          </Link>
        </li>

        <li>
          <Link className="waves-effect" onClick={this.props.close} to="/chat">
            <i className="material-icons">chat</i>
            <span>CHAT TESTING</span>
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
          <div>
            <span>
              <Link class="select-class" to="/selectClasses">Select Classes</Link>
            </span>
          </div>
        </div>
      </React.Fragment>
    );
  };
  renderMenu = () => {
    if (this.props.user == null) {
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
  return { user: state.user };
};

export default withRouter(connect(mapStateToProps)(Fixedmenu));
