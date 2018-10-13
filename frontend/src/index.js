import '@babel/polyfill'
import React from 'react'
import { render } from 'react-dom'

const App = () => {
  return (<div>hello</div>)
}

render(<App/>, document.getElementById('root'))
