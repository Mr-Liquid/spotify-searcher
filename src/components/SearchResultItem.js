import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Route, Link } from "react-router-dom";

@inject("store")
@observer
export default class SearchResultItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <li>
        {!!item.images.length && <img src={item.images[0].url} />}
        {!item.images.length && <img className="no-image" />}
        <div className="artist-title">
          <p>{item.artists[0].name}</p>
          <Link to={`/album/${item.id}`}>{item.name}</Link>
        </div>
      </li>
    );
  }
}
