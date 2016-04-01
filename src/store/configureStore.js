import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers';
import { isNode } from '../helpers';
import globals from '../../config/globals';

const loggerMiddleware = createLogger();
const router = routerMiddleware(browserHistory);

let middleware;
if (isNode()) {
  middleware = [
    thunkMiddleware
  ]
} else if (globals.__PROD__) {
  middleware = [
    thunkMiddleware,
    router
  ]
} else {
  middleware = [
    thunkMiddleware,
    loggerMiddleware,
    router
  ]
}

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware)
    // window && (window.devToolsExtension ? window.devToolsExtension() : f => f)
  ));

  return store;
}
