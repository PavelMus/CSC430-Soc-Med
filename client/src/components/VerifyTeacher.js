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
      init: "",
      instance: ""
    };
  }

  verifyTeacher = () => {
    let user = document.querySelector("select");
    axios.put(`${"/api/verify-teacher"}/${this.state.selected}`).then( res =>{
        M.toast({html: res.data.message});
        this.setState({selected: ""})
    })
  };

  componentDidMount() {
    this.loadUserList();
  }

  initForm = () => {
    let elem = document.querySelector("select");
    let instance = M.FormSelect.init(elem);
    this.setState({ init: elem, instance: instance });
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
    let teacher = document.querySelector("select");
    console.log(teacher.value);
    
    this.setState({ selected: teacher.value });
  };

  render() {
    return (
      <div id="verify-teacher-container" className="container">
        <div className="row" id="content-area-row">
          <div id="verify-left" className="col s12 m12 l12 xl12">
            <div className="input-field">
              <select onChange={this.selectedTeacher}>
                {this.state.user_options}
              </select>
              <label>User Selector</label>
              <a className="btn" onClick={this.verifyTeacher} href="#!">
                SUBMIT
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VerifyTeacher;
