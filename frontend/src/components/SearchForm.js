// @flow

import React, { Component, Fragment } from 'react'
import _ from 'lodash'

import { search, fetchSuggestions } from '../actions/searchAction'

import TextField from './TextField'
import Button from './Button'
import SearchResult from './SearchResult'
import SearchSuggestion from './SearchSuggestion'

type DataType = {
  id?: number,
  age?: number,
  name?: string,
  address?: string,
  team?: string
}

type State = {
  query?: string,
  searchResult: Array<DataType>,
  suggestions: Array<DataType>,
  showSuggestions: boolean,
}

class SearchForm extends Component<null, State> {
  state = {
    query: '',
    searchResult: [],
    suggestions: [],
    showSuggestions: true,
  }

  debouncedAutoCompleteSearch = _.debounce(query => this.autoCompleteSearch(query), 500)

  fetchData = (query: string) => {
    fetchSuggestions(query)
      .then(suggestions => this.setState({
        suggestions,
        showSuggestions: true,
      }))
  }

  autoCompleteSearch = (query: string) => {
    this.fetchData(query)
  }

  handleTextChange = (e: any) => {
    this.setState({
      query: e.target.value,
    }, () => {
      const { query } = this.state
      this.debouncedAutoCompleteSearch(query)
    })
  }

  handleSearch = () => {
    const { query } = this.state
    search(query).then(data => this.setState({
      searchResult: data,
      showSuggestions: false,
    }))
  }

  selectSuggestion = (suggestion: string) => {
    this.setState({
      query: suggestion,
      showSuggestions: false,
    })
  }

  render() {
    const {
      query,
      searchResult,
      suggestions,
      showSuggestions,
    } = this.state

    return (
      <Fragment>
        <TextField
          onChange={this.handleTextChange}
          value={query}
        />
        <Button
          active
          onClick={this.handleSearch}
        >
          Search
        </Button>
        <SearchResult result={searchResult} />
        { showSuggestions ? (
          <SearchSuggestion
            query={query}
            suggestions={suggestions}
            selectSuggestion={this.selectSuggestion}
          />
        ) : null}
      </Fragment>
    )
  }
}

export default SearchForm
