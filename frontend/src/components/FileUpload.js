// @flow

import React, { Component, Fragment } from 'react'

import Dropzone from 'react-dropzone'
import { Typography } from '@material-ui/core';

import Button from './Button'
import ModelDialog from './ModelDialog'
import Loader from './Loader'

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

class FileUpload extends Component<null, State> {
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

    const isSubmitButtonDisabled: boolean = isLoading || !uploadingFileName
    const isSubmitButtonActive: boolean = !isLoading && uploadingFileName !== ''

    const fileDropContent = (
      <Fragment>
        <Dropzone
          onDrop={this.handleFileDrop}
          multiple={false}
          accept="text/csv"
        >
          <p>Drop your csv file here or click to upload</p>
        </Dropzone>
        <Typography>{ uploadingFileName }</Typography>
        <Button
          active={isSubmitButtonActive}
          onClick={this.submitFile}
          disabled={isSubmitButtonDisabled}
        >
          Submit
        </Button>
      </Fragment>
    );

    return (
      <Fragment>
        <Button
          active
          onClick={this.showModal}
        >
          Upload the csv
        </Button>
        <ModelDialog
          title="CSV file upload"
          isModalOpen={isModalOpen}
          closeModal={this.closeModal}
        >
          { fileDropContent }
          <Loader isLoading={isLoading} />
          { fileUploadStatus }
        </ModelDialog>
      </Fragment>
    )
  }
}

export default FileUpload
