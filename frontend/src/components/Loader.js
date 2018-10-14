// @flow

import React, { Fragment } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

type Props = {
  isLoading?: boolean,
}

function Loader({ isLoading }:Props) {
  return isLoading
    ? (
      <Fragment>
        <CircularProgress />
      </Fragment>
    )
    : null
}

Loader.defaultProps = {
  isLoading: false,
}

export default Loader
