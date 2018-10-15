// @flow

import React, { Component, Fragment } from 'react'
import Dropzone from 'react-dropzone'
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button as MuiButton } from '@material-ui/core';
import { Link } from 'react-router-dom'

import Button from './Button'
import ModelDialog from './ModelDialog'
import LinearLoader from './LinearLoader'

import FileDropzone from './FileDropzone'

import uploadFile from '../actions/fileAction'

import {
  FILE_UPLOAD_STATUS_SUCCESS,
  FILE_UPLOAD_STATUS_FAIL,
} from '../constants/global'

type State = {
  isModalOpen: boolean,
  uploadingFile: Object,
  isLoading: boolean,
  fileUploadStatus: string,
  uploadingFileName: string,
}

type Props = {
  classes: any,
}

const styles = theme => ({
  button: {
    position: 'absolute',
    top: '40%',
    left: '42%',
  },
  importButton: {
    marginTop: '5px',
    width: '100px',
  },
  failText: {
    color: '#ff3d00',
  },
  successText: {
    color: '#8bc34a',
  },
  searchButton: {
    position: 'absolute',
    top: '48%',
    left: '38%',
  },
});

class FileUpload extends Component<Props, State> {
  state = {
    uploadingFile: {},
    isModalOpen: false,
    isLoading: false,
    fileUploadStatus: '',
    uploadingFileName: '',
  }

  handleFileDrop = (files: Array<Object>) => {
    const file = files[0]

    this.setState({
      uploadingFile: file,
      uploadingFileName: file.name,
      fileUploadStatus: '',
    })
  }

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      isLoading: false,
    })
  }

  showModal = () => {
    this.setState({
      isModalOpen: true,
    })
  }

  submitFile = () => {
    const {
      uploadingFile,
    } = this.state

    this.setState({
      isLoading: true,
    })

    const formData = new FormData()
    formData.append('file', (uploadingFile: any))

    uploadFile(formData)
      .then((response) => {
        if (response.data === 'OK' && !response.data.error) {
          this.setState({
            fileUploadStatus: FILE_UPLOAD_STATUS_SUCCESS,
          })
        }
        this.setState({
          isLoading: false,
        })
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          fileUploadStatus: FILE_UPLOAD_STATUS_FAIL,
        })
      })
  }

  render() {
    const {
      isModalOpen,
      isLoading,
      fileUploadStatus,
      uploadingFileName,
    } = this.state

    const { classes } = this.props

    const isSubmitButtonDisabled: boolean = isLoading || !uploadingFileName
    const isSubmitButtonActive: boolean = !isLoading && uploadingFileName !== ''

    const fileDropContent = (
      <div>
        <FileDropzone
          handleFileDrop={this.handleFileDrop}
          uploadingFileName={uploadingFileName}
        />
        <Button
          active={isSubmitButtonActive}
          onClick={this.submitFile}
          disabled={isSubmitButtonDisabled}
          classes={classes.importButton}
        >
          Import
        </Button>
      </div>
    );

    return (
      <Fragment>
        <Button
          active
          onClick={this.showModal}
          classes={classes.button}
        >
          Import the csv
        </Button>
        <MuiButton
          className={classes.searchButton}
          variant="outlined"
          href="#search"
        >
          Search Operation on CSV
        </MuiButton>
        <ModelDialog
          title="CSV File Upload"
          isModalOpen={isModalOpen}
          closeModal={this.closeModal}
        >
          { fileDropContent }
          <LinearLoader isLoading={isLoading} />
          <Typography
            variant="body2"
            gutterBottom
            className={fileUploadStatus === 'fail' ? classes.failText : classes.successText}
          >
            { fileUploadStatus }
            <Link to="/search">Search</Link>
          </Typography>
        </ModelDialog>
      </Fragment>
    )
  }
}

export default withStyles(styles)(FileUpload)
