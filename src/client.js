import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import getRoutes from './routes';
import fetchExtension from './fetchExtensions';
import './theme/style.scss';

const client = new ApiClient();
const history = useScroll(() => browserHistory)();
const store = createStore(history, client, window.__data);

window.studio = {
  routes: []
};

window.studio.react = React;

function start() {
  console.log('getting routes from ', window.studio.routes);
  const routes = getRoutes(window.studio.routes);

  ReactDOM.render(
    <Provider store={store} key="provider">
      <Router history={history}>
        {routes}
      </Router>
    </Provider>,
    document.getElementById('content')
  );
}

fetchExtension(function() {
  start();
});




/*
 if (__DEVTOOLS__ && !window.devToolsExtension) {
 const DevTools = require('./containers/DevTools/DevTools');
 ReactDOM.render(
 <Provider store={store} key="provider">
 <div>
 {component}
 <DevTools />
 </div>
 </Provider>,
 dest
 );
 }
 */
