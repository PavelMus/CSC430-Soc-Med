import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as M from 'materialize-css';

class CreateClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      level: "",
      subject: "",
      description: ""
    };
  }
  onClassSubmit = (e) =>{
    e.preventDefault();
    let _class = {
      type: this.state.type,
      level: this.state.level,
      subject: this.state.subject,
      description: this.state.description
    }
    axios.post("/api/create-class_template", _class).then(res=>{
      if(res.data != "posted"){
        M.toast({html: res.data[0].msg});
      }
      else{
        M.toast({html: "Class Template Posted" });
        this.setState({type: "", subject: "", description: ""});
      }
    });
  }
  onTypeChange = (e) =>{
    e.preventDefault();
    this.setState({type: e.target.value});
  }
  onLevelChange = (e) =>{
    e.preventDefault();
    this.setState({level: e.target.value});
  }
  onSubjectChange = (e) =>{
    e.preventDefault();
    this.setState({subject: e.target.value});
  }
  onDescriptionChange = (e) =>{
    e.preventDefault();
    this.setState({description: e.target.value});
  }
  render() {
    return (
      <div id="class-db-input" className="row">
        <h3>CLASS DATABASE INPUT</h3>
        <form className="col s12" onSubmit={this.onClassSubmit}>
          <div className="row">
            <div className="input-field col s3">
              <input value={this.state.type} id="clas_type" onChange={this.onTypeChange} type="text" className="validate" />
              <label htmlFor="calss_type">Class Type</label>
            </div>
            <div className="input-field col s3">
              <input value={this.state.level} id="class_level" onChange={this.onLevelChange} type="text" className="validate" />
              <label htmlFor="class_subject">Class Level</label>
            </div>
            <div className="input-field col s6">
              <input value={this.state.subject} id="class_subject" onChange={this.onSubjectChange} type="text" className="validate" />
              <label htmlFor="class_subject">Class Subject</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input value={this.state.description} id="class_description" onChange={this.onDescriptionChange} type="text" className="validate" />
              <label htmlFor="class_description">Class Description</label>
            </div>
          </div>
          <button type="submit" className="btn">SUBMIT</button>
        </form>
      </div>
      );
  }
}

var mapStateToProps = state =>{
    return { user: state.local };
}

export default connect(mapStateToProps)(CreateClass);