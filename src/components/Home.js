import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import SearchTextInput from "./SearchTextInput";
import SearchResultList from "./SearchResultList";

@inject("store", "routing")
@observer
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  componentDidMount() {}

  render() {
    const store = this.store;
    return (
      <div className="page home">
        <div className="page__top">
          <div>
            <span className="boilerplate-logo" />
          </div>
          {!this.props.auth.isAuthenticated() && (
            <div>
              <a
                className="btn btn--hasIcon"
                href="http://localhost:8888/login"
              >
                Sign in to Spotify
              </a>
            </div>
          )}
        </div>

        <main>
          {this.props.auth.isAuthenticated() && <SearchTextInput />}
          {this.props.auth.isAuthenticated() && <SearchResultList />}
        </main>
      </div>
    );
  }
}
