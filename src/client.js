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

var studio = window.studio = {
  routes: [],
  runtime: {},
  react : React
};

studio.runtime['core-js/object/get-prototype-of'] = require('babel-runtime/core-js/object/get-prototype-of');
studio.runtime['helpers/classCallCheck'] = require('babel-runtime/helpers/classCallCheck');
studio.runtime['helpers/createClass'] = require('babel-runtime/helpers/createClass');
studio.runtime['helpers/possibleConstructorReturn'] = require('babel-runtime/helpers/possibleConstructorReturn');
studio.runtime['helpers/inherits'] = require('babel-runtime/helpers/inherits');


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

//require('./dynamicExtensions');
//start();

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
