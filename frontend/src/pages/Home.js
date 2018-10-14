// @flow

import React from 'react'
import { Link } from 'react-router-dom'

import FileUpload from '../components/FileUpload'

function Home() {
  return (
    <div>
      <FileUpload />
      <Link to='/search'>Search</Link>
    </div>
  )
}

export default Home
