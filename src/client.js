import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { ReduxAsyncConnect } from 'redux-async-connect';
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

function start() {
  const routes = getRoutes(window.studio.routes);

  const component = (
    <Router render={(props) =>
        <ReduxAsyncConnect {...props} helpers={{client}} filter={item => !item.deferred} />
      } history={history}>
      {routes}
    </Router>
  );

  ReactDOM.render(
    <Provider store={store} key="provider">
      {component}
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
