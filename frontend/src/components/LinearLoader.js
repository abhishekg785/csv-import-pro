// @flow

import React, { Fragment } from 'react'
import { LinearProgress } from '@material-ui/core'
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

function LinearLoader({ classes, isLoading }:Props) {
  return isLoading
    ? (
      <div className={classes.root}>
        <LinearProgress
          className={classes.loader}
        />
      </div>
    )
    : null
}

LinearLoader.defaultProps = {
  isLoading: false,
}

export default withStyles(styles)(LinearLoader)
