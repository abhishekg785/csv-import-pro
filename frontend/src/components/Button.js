// @flow

import React from 'react'

import { Button as MuiButton } from '@material-ui/core'

type Props = {
  active: boolean,
  disabled?: boolean,
  children: any,
  onClick: Function,
  classes?: any,
}

function Button({
  active,
  disabled,
  children,
  onClick,
  classes,
}: Props) {
  return (
    <MuiButton
      variant="contained"
      color={active ? 'primary' : 'default'}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </MuiButton>
  )
}

Button.defaultProps = {
  disabled: false,
  classes: undefined,
}

export default Button
