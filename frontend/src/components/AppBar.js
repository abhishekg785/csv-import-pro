import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar as MuiAppBar, Toolbar, Typography } from '@material-ui/core';

const styles = {
  root: {
    flexGrow: 1,
  },
};

type Props = {
  text: string,
  classes: any,
}

function AppBar({ text, classes }: Props) {
  return (
    <div className={classes.root}>
      <MuiAppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            { text }
          </Typography>
        </Toolbar>
      </MuiAppBar>
    </div>
  );
}

export default withStyles(styles)(AppBar);
