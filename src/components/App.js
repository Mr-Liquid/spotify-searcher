import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import LazyRoute from "lazy-route";
import Auth from "./Auth";
import { Switch, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./Home";
import AlbumDetails from "./AlbumDetails";

@inject("store", "routing")
@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.auth = new Auth(this.props.routing.history);
  }
  componentWillMount() {}
  authenticate(e) {
    if (e) e.preventDefault();

    this.store.appState.authenticate();
  }

  handleAuthentication = (nextState, replace) => {
    if (/access_token|expires_in/.test(nextState.location.search)) {
      this.auth.handleAuthentication();
    }
  };

  render() {
    return (
      <div className="wrapper">
        <Route
          exact
          path="/"
          render={props => {
            return <Home {...props} auth={this.auth} />;
          }}
        />
        <Route
          exact
          path="/album/:id"
          render={props => {
            return <AlbumDetails {...props} />;
          }}
        />
        <Route
          exact
          path="/callback"
          render={props => {
            this.handleAuthentication(props);
            return null;
          }}
        />
        <ToastContainer />
      </div>
    );
  }
}

export default withRouter(App);
