import { observable, action, computed } from "mobx";
import axios from "axios";
import { Z_STREAM_ERROR } from "zlib";

export default class AppState {
  @observable
  searchData;

  @observable
  album;

  @observable
  artistAlbums;

  @observable
  isDataLoading;

  @observable
  error;

  constructor() {
    this.searchData = null;
    this.album = null;
    this.artistAlbums = null;
    this.isDataLoading = false;
    this.error = null;
  }

  async fetchSearchData(query) {
    try {
      const access_token = localStorage.getItem("access_token");
      this.setDataLoading(true);
      let { data } = await axios.get(
        `https://api.spotify.com/v1/search?q=${query}&type=album&limit=50`,
        {
          headers: {
            Authorization: "Bearer " + access_token
          }
        }
      );

      this.setData(data);
      this.setDataLoading(false);
    } catch (e) {
      this.setError({
        errorText: "Yoou must provide search query"
      });
      this.setDataLoading(false);
    }
  }

  @action
  setData(data) {
    this.searchData = data;
  }

  @action
  setDataLoading(value) {
    this.isDataLoading = value;
  }

  @action
  setError(err) {
    if (err) {
      this.error = err;
    }
    this.searchData = null;
  }

  @action
  search(query) {
    this.fetchSearchData(query);
  }

  @action
  async searchAlbumById(id) {
    try {
      const access_token = localStorage.getItem("access_token");
      this.setDataLoading(true);
      let { data } = await axios.get(
        `https://api.spotify.com/v1/albums/${id}`,
        {
          headers: {
            Authorization: "Bearer " + access_token
          }
        }
      );
      this.setAlbum(data);
      this.setDataLoading(false);
    } catch (e) {
      this.setError(e);
      this.setDataLoading(false);
    }
  }

  @action
  async serachArtistAlbums(id) {
    try {
      const access_token = localStorage.getItem("access_token");
      let { data } = await axios.get(
        `https://api.spotify.com/v1/artists/${id}/albums`,
        {
          headers: {
            Authorization: "Bearer " + access_token
          }
        }
      );
      this.setArtistAlbums(data);
    } catch (e) {
      this.setError(e);
    }
  }

  @action
  setAlbum(data) {
    this.album = data;
  }

  @action
  setArtistAlbums(data) {
    this.artistAlbums = data;
  }

  @action
  clearArtist() {
    this.artist = null;
  }

  @action
  clearAlbum() {
    this.album = null;
  }
}
