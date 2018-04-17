import React, { Component } from "react";
import * as M from "materialize-css";
import axios from "axios";

class VerifyTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_list: [],
      user_options: "",
      selected: "",
      classType: "",
      init: "",
      instance: "",
      typeInstance: ""
    };
  }

  verifyTeacher = () => {
    let user = document.querySelector("select");
    axios.put(`${"/api/verify-teacher"}/${this.state.selected}/${this.state.classType}`).then( res =>{
        M.toast({html: res.data.message});
    });
  };

  selectedClassType = e =>{
    e.preventDefault();
    this.setState({classType: e.target.value})
  }

  componentDidMount() {
    this.loadUserList();
  }

  initForm = () => {
    let elem = document.getElementById("teacherName");
    let elem2 = document.getElementById("cType");
    let instance = M.FormSelect.init(elem);
    let typeInstance = M.FormSelect.init(elem2);
    this.setState({ init: elem, instance: instance, typeInstance: typeInstance });
  };

  loadUserList = () => {
    axios.get("/api/users-list").then(res => {
      this.setState({ user_list: res.data }, this.mapUserList);
    });
  };

  mapUserList = () => {
    let users = this.state.user_list;
    console.log(this.state.user_list);
      
    let options = users.map(user => {
      return <option key={user._id} value={user._id}>{user.displayName} EMPLID: {user.EMPLID}</option>;
    });

    this.setState({ user_options: options }, this.initForm);
  };

  selectedTeacher = e => {
    let teacher = document.getElementById("teacherName");
    this.setState({ selected: teacher.value });
  };

  render() {
    return (
      <div id="verify-teacher-container" className="container">
        <div className="row" id="content-area-row">
          <div id="verify-left" className="col s8">
            <div className="input-field">
              <select id="teacherName" onChange={this.selectedTeacher}>
                <option value="">Select Teacher</option>
                {this.state.user_options}
              </select>
              <label>User Selector</label>
              <a className="btn" onClick={this.verifyTeacher} href="#!">
                SUBMIT
              </a>
            </div>
          </div>
          <div className="col s4 input-field">
            <select id="cType" onChange={this.selectedClassType}>
              <option value="">Select Subject</option>
              <option value="CSC">CSC</option>
              <option value="ENG">ENG</option>
              <option value="MTH">MTH</option>
            </select>
            <label>Class Type</label>
          </div>
        </div>
      </div>
    );
  }
}

export default VerifyTeacher;
