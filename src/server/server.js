import Express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import React from 'react'
import { Router, RouterContext, match } from 'react-router';
import { renderToString } from 'react-dom/server'

import { Provider } from 'react-redux';


import config from '../../config/webpack.config';
import configureStore from '../store/configureStore';
import routes from '../routes';

const app = Express();
const port = 8081;

let compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  hot: true,
  lazy: false,
  publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

app.use((req, res, next) => {
  const store = configureStore()

  match({routes, location: req.url}, ( error, redirectLocation, renderProps ) => {
    if (error) {
      return res.send(500, error.massage);
    }

    if (redirectLocation) {
      return res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    }

    if (renderProps == null) {
      return res.send(404, 'Not found');
    }

    console.log('renderProps', renderProps);

    const initView = renderToString(
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    );

    let initState = JSON.stringify(store.getState());
    let page = renderFullPage(initView, initState);

    res.send(200, page)
  })
})

function renderFullPage(initView, initState) {
  return  `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Share favors</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link href='http://fonts.useso.com/css?family=Roboto:400,300,500' rel='stylesheet' type='text/css'>
    </head>
    <body>
      <div id="app">${initView}</div>
      <script>window.__INITIAL_STATE__ = ${initState}</script>
      <script src="build/bundle.js"></script>
    </body>
    </html>
  `
}

app.get('*', (req, res) => {
  return res.send('Hello world')
})

app.listen(port);
