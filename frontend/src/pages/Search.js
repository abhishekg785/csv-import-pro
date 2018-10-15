// @flow

import React from 'react'

import SearchForm from '../components/SearchForm'

import AppBar from '../components/AppBar'

function Search() {
  return (
    <div>
      <AppBar text="Search" />
      <SearchForm />
    </div>
  )
}

export default Search
