import React, { Component } from "react";
import * as anime from 'animejs';

export default class AlerModal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    var cssSelector = anime.timeline();
    cssSelector.add({
        targets: '.modal',
        scale:{
          value: 0.5,
          duration: 0,
          delay: 0,
        }
      }).add({
        targets: '.modal',
        scale:{
          value: 1.4,
          duration: 300,
          delay: 50,
          easing: 'easeInOutQuart'
        }
      });
  }
  render() {
    return (
      <div className="modal">
        <div className="modal-content">
          <h4>{this.props.type}</h4>
          {this.props.alertMsg}
        </div>
        <div className="modal-footer">
          <a
            onClick={this.props.close}
            className="waves-effect waves-green btn-flat"
          >
            <i className="material-icons">close</i>
          </a>
        </div>
      </div>
    );
  }
}
