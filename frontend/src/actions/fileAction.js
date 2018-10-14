// @flow

import axios from 'axios'

import { FILE_UPLOAD_API_URL } from '../constants/global'

export default function uploadFile(data: any) {
  const params = {
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    data,
    url: FILE_UPLOAD_API_URL,
  }

  return axios(params)
}
