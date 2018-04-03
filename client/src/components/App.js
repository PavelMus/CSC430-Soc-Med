import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Landing from "./Landing";
import Header from "./Header";
import PostIndex from "./PostComponents/PostIndex";
import Footer from "./Footer";
import ComposeEvent from './ComposeEvent';
import FeedItem from "./FeedComponents/FeedItem";
class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <BrowserRouter>
        <div id="CSIBridge">
          <Header />
          <Route exact={true} path="/" component={Landing} />
          <Route exact path="/newEvent" component={ComposeEvent} />
          <Route exact path="/posts" component={PostIndex} />
          <Route path="/feed" component={FeedItem} />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.auth };
};

export default connect(mapStateToProps, actions)(App);
