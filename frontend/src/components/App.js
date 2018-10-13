// @flow

import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'

import { CssBaseline } from '@material-ui/core'

import Home from '../pages/Home'

function App() {
  return (
    <Router>
      <div>
        <CssBaseline />
        <Route exact path="/" component={Home} />
      </div>
    </Router>
  )
}

export default App
