import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Landing from "./Landing";
import Header from "./Header";
import PostIndex from "./PostComponents/PostIndex";
import Footer from "./Footer";

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
        <BrowserRouter>
          <div>
            <Header />
            <Route exact={true} path="/" component={Landing} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/somethingelse" component={SurveyNew} />
            <Route exact path="/posts" component={PostIndex} />

          </div>
        </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
