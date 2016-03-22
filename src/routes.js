import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    Home,
    Templates
  } from 'containers';

export default (aroutes) => {
  const routes = aroutes || [];

  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>
      { /* Routes */ }
      <Route path="templates" component={Templates}/>

      {routes.map((r) => <Route path={r.path} component={r.component} key={r.path} />)}
    </Route>
  );
};
