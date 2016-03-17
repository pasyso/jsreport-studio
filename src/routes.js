import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    NotFound,
    Home,
    Templates
  } from 'containers';

export default () => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>
      { /* Routes */ }
      <Route path="templates" component={Templates}/>
    </Route>
  );
};
