import * as React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Home from './pages/home'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}
