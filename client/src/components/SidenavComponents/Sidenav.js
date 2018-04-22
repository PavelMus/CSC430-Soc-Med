import React, { Component } from "react";
import { connect } from "react-redux";
import Student from './SidenavStudent';
import Teacher from './SidenavTeacher';
import Admin from './SidenavAdmin';
import AdminTeacher from './SidenavAdminTeacher';
import * as actions from "../../actions";
import * as M from "materialize-css";

class Sidenav extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.fetchClasses(this.props.id);
  }

  renderContent = () => {
    let user = this.props;
    if(user.admin && user.teacher){
      return <AdminTeacher user={this.props}/>;
    } else if(user.admin){
      return <Admin close={this.props.close}/>;
    }else if(user.teacher){
      return <Teacher/>;
    }else return <Student/>;
  }
  
  render() {
    let user = this.props;
    return (
      <ul id="slide-out" className="sidenav">
        <li>
          <div className="user-view">
            <div className="background" id="sidenav-background" />
            <a href="#!user">
              <img
                className="circle"
                src={user.avatar}
                alt="user avatar"
              />
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
  return {classes: state.classes}
}

export default connect(mapStateToProps, actions)(Sidenav);
