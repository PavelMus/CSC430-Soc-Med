import React, { Component } from "react";
import AlertSection from "./AlertSection";
import Fixedmenu from "./Fixedmenu";
import Newsfeed from "./FeedComponents/Newsfeed";
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';

class FrontPage extends Component {
  constructor(props) {
    super(props);
  }

  //renderFixedMenu = () => {
  //  switch (this.props.user) {
  //    case null:   
  //      return "";
  //    case false:
  //      return "";
  //    default:
  //      return <Fixedmenu />;
  //  }
  //}
  componentDidMount(){
    this.props.fetchUser();
  }
  render() {
    return (
      <div id="content-section-container" className="container">
        <div className="row" id="content-area-row">
          <div className="col s12 m2 l3 xl3">
            <Fixedmenu />
          </div>
          <Newsfeed pollInterval = {5000}/>
          <AlertSection />
        </div>
      </div>
    );
  }
}

//var mapStateToProps = state => {
//  return { user: state.user };
//};

export default withRouter(connect(null, actions)(FrontPage));