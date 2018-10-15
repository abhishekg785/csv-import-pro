// @flow

import React from 'react'
import { TextField as MuiTextField } from '@material-ui/core'

type Props = {
  value?: string,
  onChange: Function,
  classes: any,
}

function TextField({ value, classes, onChange }: Props) {
  return (
    <MuiTextField
      id="standard-search"
      label="Search"
      type="Search"
      value={value}
      onChange={onChange}
      className={classes}
    />
  )
}

TextField.defaultProps = {
  value: '',
}

export default TextField
