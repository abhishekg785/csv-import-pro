// @flow

import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles';

import { search, fetchSuggestions } from '../actions/searchAction'

import TextField from './TextField'
import Button from './Button'
import SearchResult from './SearchResult'
import Suggestion from './Suggestion'
import LinerLoader from './LinearLoader'

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
  isLoading: boolean,
}

type Props = {
  classes: any,
}

const styles = theme => ({
  root: {
    position: 'absolute',
    marginTop: '2%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250,
  },
  button: {
    marginTop: '2%',
    marginLeft: '2%',
  },
});

class SearchForm extends Component<Props, State> {
  state = {
    query: '',
    searchResult: [],
    suggestions: [],
    showSuggestions: false,
    isLoading: false,
  }

  debouncedAutoCompleteSearch = _.debounce(query => this.autoCompleteSearch(query), 500)

  fetchData = (query: string) => {
    this.setState({ isLoading: true })

    fetchSuggestions(query)
      .then(suggestions => this.setState({
        suggestions,
        showSuggestions: true,
        isLoading: false,
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
    this.setState({ isLoading: true })

    search(query).then(data => this.setState({
      searchResult: data,
      showSuggestions: false,
      isLoading: false,
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
      isLoading,
    } = this.state

    const { classes } = this.props

    return (
      <Fragment>
        <LinerLoader isLoading={isLoading} />
        <div className={classes.root}>
          <TextField
            onChange={this.handleTextChange}
            value={query}
            classes={classes.textField}
          />
          <br />
          <Button
            active
            onClick={this.handleSearch}
            disabled={!query}
            classes={classes.button}
          >
            Search
          </Button>
          { showSuggestions && (
            <Suggestion
              query={query}
              suggestions={suggestions}
              selectSuggestion={this.selectSuggestion}
            />
          )}
          <SearchResult result={searchResult} />
        </div>
      </Fragment>
    )
  }
}

export default withStyles(styles)(SearchForm)
