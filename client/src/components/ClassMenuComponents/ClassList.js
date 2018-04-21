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
    this.props.user.classes
    ?this.setState({classes: this.props.user.classes}, this.generateClassList)
    :'';
  }
  
  generateClassList = () => {
    let classes = this.state.classes;
    let classList = classes.map(cls => {
      return (
        <ClassItem key={cls._id} class={cls} />
      );
    });
    this.setState({classList: classList});
  }

  render() {
    return this.state.classList;
  }
}

var mapStateToProps = state => {
  return { user: state.user };
};

export default withRouter(connect(mapStateToProps)(ClassList));