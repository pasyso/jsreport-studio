import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    Home,
    Templates,
    TemplateList
  } from 'containers';

export default (aroutes) => {
  const routes = aroutes || [];

  console.log('rendering routes');
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>
      { /* Routes */ }
      <Route path="/studio/templates" component={TemplateList}/>
      <Route path="/studio/templating" component={Templates}/>

      {routes.map((r) => <Route path={r.path} component={r.component} key={r.path} />)}
    </Route>
  );
};
