// @flow

import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import { Transform } from 'stream'

import type { Context, Request } from 'koa'
import multer from 'koa-multer'
import cleandir from 'clean-dir'
import csvStreamify from 'csv-streamify'

import {
  SUPPORTED_MIME_TYPES,
} from '../constants'

type $Context = {
  ...Context,
  request: {
    ...Request,
    body: Object,
  },
}

const fileUploadDirPath = path.resolve(__dirname, '..', 'uploads')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, fileUploadDirPath)
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}.csv`)
  },
})

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const { mimetype } = file

    if (!SUPPORTED_MIME_TYPES.includes(mimetype)) return cb(null, false)

    return cb(null, true)
  },
});

// clears the dir on the given path
const clearUploadsDir = dirPath => new Promise((resolve, reject) => {
  cleandir(dirPath, (error) => {
    if (error) return reject(error)

    return resolve()
  })
})

const getFile = async () => {
  const readDir = promisify(fs.readdir)

  const file = await readDir(fileUploadDirPath)

  if (file.length === 0 || file.length > 1) {
    throw new Error('0 or more than 1 file available for the given operation!')
  }

  return file[0]
}

const getQueryFilter = (query) => {
  const filter = new Transform({ objectMode: true })

  // eslint-disable-next-line no-underscore-dangle
  filter._transform = function t(data, encoding, done) {
    if (data.includes(query)) {
      const [id, name, age, address, team] = data
      this.push({
        id,
        name,
        age,
        address,
        team,
      })
    }

    done()
  }

  return filter
}

const parseCsv = (csvFilePath, query) => new Promise((resolve, reject) => {
  const result = []
  const csvToJson = csvStreamify()

  const filter = getQueryFilter(query)

  fs.createReadStream(csvFilePath)
    .on('error', e => reject(e))
    .pipe(csvToJson)
    .pipe(filter)
    .on('data', (d) => {
      result.push(d)
    })
    .on('end', () => {
      resolve(result)
    })
    .on('error', error => reject(error))
})

const csv = {
  displayPage: async (ctx: Context) => {
    ctx.body = 'displayPage'
  },

  import: async (ctx: $Context) => {
    // clear the uploads dir
    await clearUploadsDir(fileUploadDirPath)

    // upload the new file
    const singleFileUpload = upload.single('file');
    singleFileUpload(ctx)

    ctx.status = 200
  },

  search: async (ctx: $Context) => {
    try {
      const { body } = ctx.request
      const { query } = body

      if (!query) {
        ctx.status = 400
        ctx.body = 'Query is required.'

        return
      }

      const file = await getFile()

      const result = await parseCsv(path.resolve(fileUploadDirPath, file), query)

      ctx.status = 200
      ctx.body = {
        success: true,
        result,
      }
    } catch (error) {
      ctx.body = {
        error: true,
        message: error.message,
      }
    }
  },
}

export default csv
