import React from 'react'

import { Modal as MuiModel, Typography, withStyles } from '@material-ui/core'

type Props = {
  title?: string,
  isModalOpen?: boolean,
  children: any,
  closeModal?: Function,
  classes: any,
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    left: '25%',
    top: '15%',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

function ModelDialog({
  title,
  isModalOpen,
  children,
  closeModal,
  classes,
}: Props) {
  return (
    <MuiModel
      open={isModalOpen}
      onClose={closeModal}
    >
      <div className={classes.paper}>
        <Typography>{title}</Typography>
        {children}
      </div>
    </MuiModel>
  )
}

ModelDialog.defaultProps = {
  title: undefined,
  isModalOpen: false,
  closeModal: undefined,
}

export default withStyles(styles)(ModelDialog)
