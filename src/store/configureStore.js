import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers';
import { isNode, isBrowser } from '../helpers';
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
  let enhancer;
  if (isBrowser()) {
    enhancer = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    );
  } else {
    enhancer = compose(
      applyMiddleware(...middleware)
    );
  }

  const store = createStore(rootReducer, initialState, enhancer);

  return store;
}
