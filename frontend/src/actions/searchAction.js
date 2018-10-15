// @flow

import axios from 'axios'
import _ from 'lodash'

import {
  FILE_SEARCH_AUTOCOMPLETE_API_URL,
  FILE_SEARCH_QUERY_API_URL,
} from '../constants/global'

export const fetchSuggestions = async (query: string) => {
  try {
    const response = await axios.get(FILE_SEARCH_AUTOCOMPLETE_API_URL, {
      params: {
        query,
        field: 'NAME',
        limit: 20,
      },
    })

    const result = _.get(response, 'data.result') || []

    return result
    // return [
    //   {
    //     id: 12,
    //     name: 'abhishek',
    //     age: 21,
    //     team: 'blue',
    //     address: 'hiro house',
    //   },
    //   {
    //     id: 13,
    //     name: 'sushma',
    //     age: 21,
    //     team: 'blue',
    //     address: 'hiro house',
    //   },
    //   {
    //     id: 14,
    //     name: 'pooja',
    //     age: 21,
    //     team: 'blue',
    //     address: 'hiro house',
    //   },
    //   {
    //     id: 15,
    //     name: 'dinesh',
    //     age: 21,
    //     team: 'blue',
    //     address: 'hiro house',
    //   },
    // ]
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    return []
  }
}

export const search = async (query: string) => {
  try {
    const data = { query }
    const response = await axios.post(FILE_SEARCH_QUERY_API_URL, data)

    const result = _.get(response, 'data.result') || []

    return result
    // return [
    //   {
    //     id: 12,
    //     name: 'abhishek',
    //     age: 21,
    //     team: 'blue',
    //     address: 'hiro house',
    //   },
    //   {
    //     id: 13,
    //     name: 'sushma',
    //     age: 21,
    //     team: 'blue',
    //     address: 'hiro house',
    //   },
    //   {
    //     id: 14,
    //     name: 'pooja',
    //     age: 21,
    //     team: 'blue',
    //     address: 'hiro house',
    //   },
    //   {
    //     id: 15,
    //     name: 'dinesh',
    //     age: 21,
    //     team: 'blue',
    //     address: 'hiro house',
    //   },
    // ]
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    return []
  }
}