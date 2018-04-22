import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import * as actions from '../../actions';

class SidenavAdminTeacher extends Component {
  constructor(props){
    super(props);
    this.state = {
      adminList: "",
      teacherList: ""
    }
  }

  componentDidMount(){
    this.mapAdmins();
    this.mapTeachers();
  }

  mapAdmins = () => {
    if(this.props.admins !== null){
      let admins = this.props.admins;
      let adminList = admins.map( admin => {
        return (
          <li key={admin._id + "admin"}>
            <a className="sidenav_username waves-effect" href="#!">
              <img src={admin.avatar}  alt="user avatar" className="sidenav_avatars" />
              <p>{admin.displayName}</p>
            </a>
          </li>
        );
      });
      this.setState({adminList: adminList});
    }
  }

  mapTeachers = () => {
    if(this.props.teachers !== null){
      let teachers = this.props.teachers;
      let teacherList = teachers.map( teacher => {
        return (
          <li key={teacher._id + "teacher"}>
            <a className="sidenav_username waves-effect" href="#!">
              <img src={teacher.avatar}  alt="user avatar" className="sidenav_avatars" />
              <p>{teacher.displayName}</p>
            </a>
          </li>
        );
      });
      this.setState({teacherList: teacherList});
    }
  }

  render() {
    return (
      <React.Fragment>
        <li>
          <a className="subheader">
            <i className="material-icons">face</i>
            ADMINS
          </a>
        </li>
        {this.state.adminList}
        <li>
          <div className="divider" />
        </li>
        <li>
          <a className="subheader">
            <i className="material-icons">school</i>
            TEACHERS
          </a>
        </li>
        {this.state.teacherList}
        <li>
          <a className="subheader">
            <i className="material-icons">school</i>
            STUDENTS
          </a>
        </li>
        <li>
          <a className="waves-effect" href="#!">
            Student 1
          </a>
        </li>
        <li>
          <a className="waves-effect" href="#!">
            Student 2
          </a>
        </li>
        <li>
          <a className="waves-effect" href="#!">
            Student 3
          </a>
        </li>
        <li>
          <a className="waves-effect" href="#!">
            Student 4
          </a>
        </li>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    teachers: state.teachers,
    admins: state.admins
}}

export default SidenavAdminTeacher;