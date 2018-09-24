//import { store } from 'rfx-core';

import AppState from "./AppState";

export function createStore() {
  return {
    appState: new AppState()
  };
}
