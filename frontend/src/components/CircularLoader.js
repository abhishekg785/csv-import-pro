// @flow

import React, { Fragment } from 'react'
import { CircularProgress } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

type Props = {
  classes: any,
  isLoading?: boolean,
}

const styles = {
  root: {
    flexGrow: 1,
  },
  loader: {
    marginTop: '5px',
  },
};

function CircularLoader({ classes, isLoading }:Props) {
  return isLoading
    ? (
      <div className={classes.root}>
        <CircularProgress
          className={classes.loader}
        />
      </div>
    )
    : null
}

CircularLoader.defaultProps = {
  isLoading: false,
}

export default withStyles(styles)(CircularLoader)

