import("./styles/main.scss");
import React from "react";
import { render } from "react-dom";
import { Router, BrowserRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { AppContainer } from "react-hot-loader";
import { rehydrate, hotRehydrate } from "rfx-core";

import { isProduction } from "./utils/constants";
import App from "./components/App";
import { createStore } from "./stores/stores";

import { RouterStore, syncHistoryWithStore } from "mobx-react-router";
import createBrowserHistory from "history/createBrowserHistory";

const store = createStore();

const renderApp = Component => {
  const browserHistory = createBrowserHistory();
  const routeStore = new RouterStore();
  const history = syncHistoryWithStore(browserHistory, routeStore);
  render(
    <AppContainer>
      <Provider store={store} routing={routeStore}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  );
};

renderApp(App);

if (module.hot) {
  module.hot.accept(() => renderApp(App));
}
