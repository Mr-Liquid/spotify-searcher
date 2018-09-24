import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { get, isEmpty } from "lodash";
import TrackItem from "./TrackItem";
import { Link } from "react-router-dom";

@inject("store", "routing")
@observer
export default class AlbumDetails extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  componentDidMount() {
    const { params } = this.props.match;
    const { appState } = this.store;
    appState.searchAlbumById(params.id);
  }

  componentWillUnmount() {
    const { appState } = this.store;
    appState.clearAlbum();
  }

  render() {
    const { appState } = this.store;
    let album = get(appState, "album", null);
    return (
      <div className="page">
        <div className="page__top">
          <div className="logo-wrapper">
            <span className="boilerplate-logo" />
            <Link to="/" className="back-button">
              Back
            </Link>
          </div>
        </div>
        <main className="container">
          {!appState.isDataLoading && (
            <aside className="album">
              <img src={album && album.images[0].url} />
              <div className="album-title">
                <h3>{album && album.name}</h3>
                <p>
                  {album &&
                    album.artists.reduce(
                      (agg, curItem) => agg + " " + curItem.name,
                      ""
                    )}
                </p>
                <p>
                  {album &&
                    album.genres.reduce(
                      (agg, curItem) => agg + " " + curItem.name,
                      ""
                    )}
                </p>
              </div>
            </aside>
          )}
          {!appState.isDataLoading && (
            <section className="track-list">
              <ul>
                {album &&
                  album.tracks.items.map(item => {
                    return <TrackItem key={item.id} item={item} />;
                  })}
              </ul>
            </section>
          )}
          {appState.isDataLoading && (
            <img
              className="loader"
              src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
            />
          )}
        </main>
      </div>
    );
  }
}
