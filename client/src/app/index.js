// TODO considser HMR hot module
// TODO consider, RedBox
import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, IndexRedirect, Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

import Shell from './layouts/shell/ShellView';
import Home from './modules/home/component/HomeView';
import Search from './modules/search/component/SearchView';

import 'bootstrap/dist/css/bootstrap.css';

if (__DEV__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Shell}>
        <IndexRedirect to="/home" />
        <Route path="home" component={Home} />
        <Route path="search" component={Search} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);
