import React, { Component } from "react";
import ClassItem from "./ClassMenuItem";
import axios from "axios";

class ClassList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: null
    }
  }

  componentDidMount(){
    this.setState({classes: this.props.user.classes}, this.logState);
  }

  logState = () =>{
    console.log(this.state.classes);
  }

  renderClasses = () => {

  }

  render() {
    return (
    <ClassItem
      class={this.props.classes}
       />
  );
  }
}

export default ClassList;