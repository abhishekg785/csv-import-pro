// @flow
import React, { Fragment } from 'react'
import Dropzone from 'react-dropzone'
import { Typography } from '@material-ui/core'

type Props = {
  handleFileDrop: Function,
  uploadingFileName?: string,
}

function FileDropzone({ handleFileDrop, uploadingFileName }: Props) {
  return (
    <Fragment>
      <Dropzone
        onDrop={handleFileDrop}
        multiple={false}
        accept="text/csv"
      >
        <Typography
          variant="subheading"
          gutterBottom
          align="center"
        >
         Drop your csv file here or Click to upload
        </Typography>
        <Typography
          gutterBottom
          align="center"
        >
          Only .csv files will be accepted.
        </Typography>
      </Dropzone>
      <Typography
        variant="subheading"
        gutterBottom
      >
        { uploadingFileName }
      </Typography>
    </Fragment>
  )
}

FileDropzone.defaultProps = {
  uploadingFileName: '',
}

export default FileDropzone
