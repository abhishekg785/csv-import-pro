// @flow

import React from 'react'
import { Route, HashRouter as Router } from 'react-router-dom'

import { CssBaseline } from '@material-ui/core'

import Home from '../pages/Home'
import Search from '../pages/Search'

function App() {
  return (
    <Router>
      <div>
        <CssBaseline />
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={Search} />
      </div>
    </Router>
  )
}

export default App
