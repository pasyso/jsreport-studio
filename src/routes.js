import React from 'react'
import {IndexRoute, Route} from 'react-router'
import {
    App,
    Studio
  } from 'containers'

export default (aroutes) => {
  const routes = aroutes || []

  return (
    <Route path='/' component={App}>
      <IndexRoute component={Studio}/>
      <Route path='studio' component={Studio}>
        <Route path=':entityType' component={Studio}>
          <Route path=':shortid' component={Studio} />
        </Route>
      </Route>
      {routes.map((r) => <Route path={r.path} component={r.component} key={r.path} />)}
    </Route>
  )
}
