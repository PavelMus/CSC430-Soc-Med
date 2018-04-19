import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "../actions";
import FrontPage from "./FrontPage";
import Header from "./Header";
import PostIndex from "./PostComponents/PostIndex";
import Footer from "./Footer";
import ComposeEvent from './ComposeEvent';
import ComposeNews from './ComposeNews';
import ComposeAlert from './AlertComponents/ComposeAlert';
import ComposeClass from './ComposeClass';
import FeedItem from "./FeedComponents/FeedItem";
import Registration from './Registration';
import VerifyTeacher from './developersOnly/VerifyTeacher';
import Login from './Login';
import chat  from "./Chat";
import CreateClass from './developersOnly/CreateClass';
import SelectClasses from './SelectClasses';
import ClassPage  from "./ClassMenuComponents/ClassPage";
import Announcements from "./ClassMenuComponents/Announcements";
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <div id="CSIBridge">
          <Header />
          <Route exact={true} path="/" component={FrontPage} />
          <Route exact path="/newEvent" component={ComposeEvent} />
          <Route exact path="/newNews" component={ComposeNews} />
          <Route exact path="/newAlert" component={ComposeAlert} />
          <Route exact path="/posts" component={PostIndex} />
          <Route ecavt path="/chat" component={chat} />
          <Route path="/feed" component={FeedItem} />
          <Route exact path="/register" component={Registration} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/classDBInput" component={CreateClass} />
          <Route path="/ClassPage" component={ClassPage} />
          <Route path="/Announcements" component={Announcements} />
          <Route exact path="/VerifyTeacher" component={VerifyTeacher} />
          <Route exact path="/newClassSection" component={ComposeClass} />
          <Route exact path="/selectClasses" component={SelectClasses} />
        </div>
      </BrowserRouter>
    );
  }
}

var mapStateToProps = state =>{
  return {user: state.local};
};

export default connect(mapStateToProps, actions)(App);