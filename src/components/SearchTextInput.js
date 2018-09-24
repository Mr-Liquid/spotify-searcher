import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WAIT_INTERVAL = 2000;

@inject("store")
@observer
export default class SearchTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }

  componentWillMount() {
    this.timer = null;
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  handleChange(e) {
    clearTimeout(this.timer);
    this.setState({
      text: e.target.value
    });
    this.timer = setTimeout(this.search, WAIT_INTERVAL);
  }
  search() {
    if (!!this.timer) {
      clearTimeout(this.timer);
    }
    const { appState } = this.props.store;
    const { text } = this.state;
    if (!text && !this.timer) {
      toast("Must provide search query!!!", {
        position: "bottom-right",
        closeButton: false,
        hideProgressBar: true,
        type: toast.TYPE.ERROR
      });
    }
    !!text && appState.search(text);
  }
  render() {
    return (
      <div className="searchWrapper">
        <input
          type="text"
          autoFocus
          placeholder={"Type something for start search"}
          value={this.state.text}
          onChange={this.handleChange}
        />
        <button type="button" onClick={this.search}>
          Search
        </button>
      </div>
    );
  }
}
