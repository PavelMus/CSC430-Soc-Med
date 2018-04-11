import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class CreateClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      subject: "",
      description: ""
    };
  }
  onTypeChange = (e) =>{
    e.preventDefault();
    this.setState({type: e.value});
  }
  onSubjectChange = (e) =>{
    e.preventDefault();
    this.setState({subject: e.value});
  }
  onDescriptionChange = (e) =>{
    e.preventDefault();
    this.setState({description: e.value});
  }
  render() {
    return (
      <div id="class-db-input" className="row">
        <h3>CLASS DATABASE INPUT</h3>
        <form className="col s12" action="/api//create-class_template" method="post">
          <div className="row">
            <div className="input-field col s4">
              <input value={this.state.type} id="clas_type" onChange={this.onTypeChange} type="text" className="validate" />
              <label htmlFor="calss_type">Class Type</label>
            </div>
            <div className="input-field col s8">
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