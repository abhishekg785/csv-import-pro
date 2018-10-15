// @flow

import React from 'react'

import AppBar from '../components/AppBar'
import FileUpload from '../components/FileUpload'

function Home() {
  return (
    <div>
      <AppBar text="Home" />
      <FileUpload />
    </div>
  )
}

export default Home
