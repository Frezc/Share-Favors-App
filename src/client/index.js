import 'babel-polyfill';
import React from 'react';
import {
  render
}
from 'react-dom';
import {
  Provider
}
from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import '../assets';
import configureStore from './../store/configureStore';
import routes from '../routes';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const initState = window.__INITIAL_STATE__;

const store = configureStore(initState);
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: state => state.router
});

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
