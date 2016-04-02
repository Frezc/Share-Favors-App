import Express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import React from 'react'
import { Router, RouterContext, match } from 'react-router';
import { renderToString } from 'react-dom/server';

import { Provider } from 'react-redux';
import favicon from 'serve-favicon'
import path from 'path';

import config from '../../config/webpack.config';
import configureStore from '../store/configureStore';
import routes from '../routes';

import { isBrowser, isNode } from '../helpers';
import { fetchUser } from '../actions/fetchAction';

// fix Material-UI: userAgent should be supplied
global.navigator = { userAgent: 'all' };

const app = Express();
const port = 8081;

let compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

app.use(favicon(__dirname + '/../assets/favicon.ico'));

app.use((req, res, next) => {
  const store = configureStore()

  match({routes, location: req.url}, ( error, redirectLocation, renderProps ) => {
    if (error) {
      return res.redirect('/error500');
    }

    if (redirectLocation) {
      return res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    }

    if (renderProps == null) {
      return res.redirect('/error404');
    }

    // return res.redirect('/user/4');
    // console.log('renderProps', renderProps);

    // console.log(renderProps)
    // console.log(`[server] isBrowser: ${isBrowser()}, isNode: ${isNode()}`)

    // console.log(renderProps.params)

    // not necessary
    // if (req.url == '/error404') {
    //   return res.status(404).send(page);
    // } else if (req.url == '/error500') {
    //   return res.status(500).send(page);
    // }
    fetchComponentsData(store.dispatch, renderProps.components, renderProps.params)
      .then(status => {
        console.log('status', status)
        if (status[0] && status[0] != 200) {
          return res.redirect(`/error${status[0]}`);
        }
        const initView = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        // console.log('store: ', store.getState())

        let initState = JSON.stringify(store.getState());
        let page = renderFullPage(initView, initState);
        
        return res.status(200).send(page);
      })
      .catch(error => {
        res.end(error.message);
      })
  })
})

function fetchComponentsData(dispatch, components, params) {
  let fetchData = components.reduce((pre, cur) => {
    return Object.keys(cur).reduce((acc, key) => {
      return cur[key].hasOwnProperty('fetchData') ? acc.concat(cur[key].fetchData) : acc;
    }, pre)
  }, []);
  const promises = fetchData.map(fetch => dispatch(fetch(params)));
  return Promise.all(promises);
}

function renderFullPage(initView, initState) {
  return  `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Share favors</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link href='/build/style.css' rel='stylesheet' type='text/css'>
      <link href='http://fonts.useso.com/css?family=Roboto:400,300,500' rel='stylesheet' type='text/css'>
    </head>
    <body>
      <div id="app"><div>${initView}</div></div>
      <script>window.__INITIAL_STATE__ = ${initState}</script>
      <script src="/build/bundle.js"></script>
    </body>
    </html>
  `
}

app.listen(port);
