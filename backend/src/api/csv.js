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
  CSV_STRUCTURE_FIELDS,
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

const getFormattedData = (data: Array<mixed>) => {
  const [
    id,
    name,
    age,
    address,
    team,
  ] = data

  return {
    id,
    name,
    age,
    address,
    team,
  }
}

const getQueryFilter = (query) => {
  const queryFilter = new Transform({ objectMode: true })

  // eslint-disable-next-line no-underscore-dangle
  queryFilter._transform = function t(data, encoding, done) {
    if (data.includes(query)) {
      this.push(getFormattedData(data))
    }

    done()
  }

  return queryFilter
}

// filter for the name field in the data
const filterOnkey = (key, query) => {
  const filter = new Transform({ objectMode: true })

  // eslint-disable-next-line no-underscore-dangle
  filter._transform = function t(data, encoding, done) {
    const d = data[key] || null
    if (d && d.match(new RegExp(query))) {
      this.push(getFormattedData(data))
    }

    done()
  }

  return filter
}

const parseCsv = (csvFilePath, filter) => new Promise((resolve, reject) => {
  const result = []
  const csvToJson = csvStreamify()

  const readStream = fs.createReadStream(csvFilePath)
    .on('error', e => reject(e))
    .pipe(csvToJson)
    .pipe(filter)
    .on('data', d => result.push(d))
    .on('end', () => { resolve(result) })
    .on('error', error => reject(error))
})

const csv = {
  displayPage: async (ctx: Context) => {
    ctx.body = 'displayPage'
  },

  import: async (ctx: $Context) => {
    await clearUploadsDir(fileUploadDirPath)

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

      const queryFilter = getQueryFilter(query)

      const fileName = await getFile()

      const result = await parseCsv(path.resolve(fileUploadDirPath, fileName), queryFilter)

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

  autocomplete: async (ctx: $Context) => {
    try {
      const { query, limit, field } = ctx.query

      const key = CSV_STRUCTURE_FIELDS.indexOf(field.toLowerCase())
      if (key === -1) {
        throw new Error(`No such field ${field} exists in the csv file.`)
      }

      const filter = filterOnkey(key, query)

      const fileName = await getFile()

      const result = await parseCsv(path.resolve(fileUploadDirPath, fileName), filter)
      const limitResult = result.slice(0, limit)

      ctx.status = 200
      ctx.body = {
        success: true,
        result: limitResult,
      }
    } catch (error) {
      ctx.body = {
        error: true,
        message: error.message,
      }
    }
  }
}

export default csv
