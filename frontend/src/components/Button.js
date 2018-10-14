// @flow

import React from 'react'

import { Button as MuiButton } from '@material-ui/core'

type Props = {
  active: boolean,
  disabled?: boolean,
  children: any,
  onClick: Function,
}

function Button({
  active,
  disabled,
  children,
  onClick,
}: Props) {
  return (
    <MuiButton
      variant="contained"
      color={active ? 'primary' : 'default'}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </MuiButton>
  )
}

Button.defaultProps = {
  disabled: false,
}

export default Button

