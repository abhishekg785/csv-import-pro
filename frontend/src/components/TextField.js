// @flow

import React from 'react'
import { TextField as MuiTextField } from '@material-ui/core'

type Props = {
  value?: string,
  onChange: Function,
}

function TextField({ value, onChange }: Props) {
  return (
    <MuiTextField
      id="standard-search"
      label="Search"
      type="Search"
      value={value}
      onChange={onChange}
    />
  )
}

TextField.defaultProps = {
  value: '',
}

export default TextField
