import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Route, Link } from "react-router-dom";

@inject("store")
@observer
export default class TrackItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <li>
        <p>{item.name}</p>
      </li>
    );
  }
}
