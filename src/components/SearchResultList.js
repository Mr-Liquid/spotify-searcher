import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import SearchResultItem from "./SearchResultItem";

@inject("store", "routing")
@observer
export default class SearchResultList extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }
  componentWillReceiveProps(newProps) {
    console.log(newProps);
  }
  render() {
    const { appState } = this.store;
    return (
      <React.Fragment>
        {!appState.isDataLoading && (
          <ul className="search-list">
            {appState &&
              appState.searchData &&
              appState.searchData.albums.items.map(item => {
                return <SearchResultItem key={item.id} item={item} />;
              })}
            {appState &&
              appState.searchData &&
              !appState.searchData.albums.items.length && (
                <li>
                  <div className="artist-title">
                    <p>No results</p>
                  </div>
                </li>
              )}
          </ul>
        )}
        {appState.isDataLoading && (
          <img
            className="loader"
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          />
        )}
      </React.Fragment>
    );
  }
}
