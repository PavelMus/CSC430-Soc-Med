import React, { Component } from "react";
import * as anime from 'animejs';

export default class AlertModal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    var cssSelector = anime.timeline();
    cssSelector.add({
        targets: '.modal',
        scale: [0, 1.2],
        duration: 300,
        easing: 'easeInOutQuart'
      });
  }
  render() {
    return (
      <React.Fragment>
        <div onClick={this.props.close} className="modal-underlay" />
        <div className="modal">
          <div className="modal-content">
            <h4>{this.props.type}</h4>
            {this.props.alertMsg}
          </div>
          <div className="modal-footer">
            <p>Thu, 05 Apr 2018 00:22:37 GMT</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
