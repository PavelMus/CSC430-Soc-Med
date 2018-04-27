import React, { Component } from "react";
import { connect } from 'react-redux'
import AlertSection from "../AlertSection";
import Fixedmenu from "../Fixedmenu";
import axios from "axios";
import * as M from 'materialize-css';
import AlertPreview from './AlertBox'
import {WEATHER_ALERT} from './types';


class ComposeAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
        content: "",
        previewType: ""
    }
  }

  submitAlert = (e) => {
    e.preventDefault();
    let alertType = document.querySelector('select');
    let alert = {
      type: alertType.value,
      content: this.state.content
    }
    axios.post("/api/new-alert/", alert);
  }

  onTextChange = (e) => {
      e.preventDefault();
      this.setState({content: e.target.value})
  }

  componentDidMount() {
      let elem = document.querySelector('select');
      let instance = M.FormSelect.init(elem);
  }

  typeUpdate = () => {
    let typePreview = document.querySelector('select');
    this.setState({previewType: typePreview.value})
  }
  renderUser = () => {
      switch (this.props.user) {
        case null:
          return "";

        default:
        return(
          <div className="user-col col s6 m6 l1 xl1">
            <div className="user-info">
              <div class="user-pic-wrapper">
                <img class="user-pic" src={this.props.user.avatar} width="64"/>
              </div>
                <p className="user-name">{this.props.user.displayName}</p>
                <p className="time">Dec 13, 2017</p>
            </div>
          </div>
        );
      }
  }
  render() {
    return (
      <div id="alert-section-container" className="container">
        <div className="row" id="content-area-row">
          <div className="col l2 lx2">
            <Fixedmenu user={this.props.user?this.props.user:""}/>
          </div>

          <div id="alert-middle" className="col s12 m12 l7 xl7">

            <div id="alert-type-selector" >
              <div className="input-field">
                  <select onChange={this.typeUpdate}>
                  <option value="1" disabled selected>Select Alert Type</option>
                  <option value={WEATHER_ALERT}>Weather Alert</option>
                  <option value="2">Closing Alert</option>
                  <option value="3">Assignment Due Alert</option>
                  </select>
                  <label>Alert Type Selector</label>
              </div>
            </div>


            <div id="alert-preview">
            <h4>This is a live preview of the outgoing alert</h4>
                <AlertPreview
                  type={this.state.previewType}
                  content={this.state.content}
                />
            </div>
            <div className="input-field col s12">
              <textarea id="textarea1" onChange={this.onTextChange} value={this.state.content} className="materialize-textarea"></textarea>
              <label htmlFor="textarea1">Text</label>
            </div>
            <a className="btn" onClick={this.submitAlert} href="#!">SUBMIT</a>
          </div>
          {/* Here we are calling the renderUser function*/}
          {this.renderUser()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {user: state.user}
}

export default connect(mapStateToProps)(ComposeAlert);
