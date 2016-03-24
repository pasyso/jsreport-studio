import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    Home,
    Template,
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
      <Route path="/studio/templating" component={TemplateList}/>
      <Route path="/studio/templating" component={Template}/>

      {routes.map((r) => <Route path={r.path} component={r.component} key={r.path} />)}
    </Route>
  );
};
