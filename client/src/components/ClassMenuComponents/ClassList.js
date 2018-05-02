import React, { Component } from "react";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import ClassItem from "./ClassMenuItem";
import axios from "axios";

class ClassList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      classList: []
    }
  }

  componentDidMount(){
    //this.setState({classes: this.props.classes}, this.generateClassList);
    this.generateClassList();
  }

  generateClassList = () => {
    let classes = this.props.classes;
    let classList = classes.map(cls => {
    return (
      <ClassItem key={cls._id} user={this.props.user} class={cls} />
    );
  });
  this.setState({classList: classList});
  }

  render() {
    return this.state.classList;
  }
}

export default ClassList;