import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import FrontPage from "./FrontPage";
import Header from "./Header";
import PostIndex from "./PostComponents/PostIndex";
import Footer from "./Footer";
import ComposeEvent from './ComposeEvent';
import ComposeNews from './ComposeNews';
import ComposeAlert from './AlertComponents/ComposeAlert';
import FeedItem from "./FeedComponents/FeedItem";
import Registration from './Registration';
import Login from './Login';
import chat  from "./Chat";
class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchLocalUser();
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
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.auth };
};

export default connect(mapStateToProps, actions)(App);
