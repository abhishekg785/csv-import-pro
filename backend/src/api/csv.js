// @flow

import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import { Transform } from 'stream'

import type { Context, Request } from 'koa'
import multer from 'koa-multer'
import cleandir from 'clean-dir'
import csvStreamify from 'csv-streamify'

import validateSchema from '../validation'

import redis from '../redis'
import dumbCache from '../utils/dataService'

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

// the path of the upload dir where the file is being uploaded
const fileUploadDirPath = path.resolve(__dirname, '..', 'uploads')

// Configure file storage and name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, fileUploadDirPath)
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}.csv`)
  },
})

// use multer to upload the file
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const { mimetype } = file

    // check for the given MIME type, i.e text/csv in this case
    if (!SUPPORTED_MIME_TYPES.includes(mimetype)) return cb(null, false)

    return cb(null, true)
  },
});

// utility function to clean the dir on the given path
const clearUploadsDir = dirPath => new Promise((resolve, reject) => {
  cleandir(dirPath, (error) => {
    if (error) return reject(error)

    return resolve()
  })
})

// Returns the name of the imported file
const getFile = async () => {
  // promisify the readdir operation of fs module
  const readDir = promisify(fs.readdir)

  const files = await readDir(fileUploadDirPath)

  // ignore the notes file
  if (files.includes('notes')) files.splice(files.indexOf('notes'), 1)

  // check that only single imported file is present
  if (files.length === 0 || files.length > 1) {
    throw new Error('0 or more than 1 csv file available for the given operation!')
  }

  return files[0]
}

// Formats the data on the basis of the given csv file structure
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

// CSV FILE STREAM OPERATIONS HERE

/**
 * TRANSFORM STREAMS
 *
 * Read the csv file as streams.
 * The data will be piped to the queryFilter
 * which will forward the data that matches the given query
 *
 * @param query : The data to be matched in the csv file
 */
const getQueryFilter = (query: string) => {
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

/**
 * TRANSFORM STREAMS
 *
 * Read the csv file as streams.
 * The data will be piped to the filter
 * The filter passes the data that matches the given
 * key and query.
 *
 * for eg: if the key is 'NAME' and query is 'Hiro'
 * it will pass only the names in the data that contains 'Hiro'
 *
 * @param key : The part of the data needed to be queried eg: NAME, AGE, ADDRESS
 * @param query : The data to be matched in the csv file
 */
const filterOnkey = (key: string, query: string) => {
  const filter = new Transform({ objectMode: true })

  // eslint-disable-next-line no-underscore-dangle
  filter._transform = function t(data, encoding, done) {
    const d = data[key] || null
    if (d && d.match(new RegExp(query, 'i'))) {
      this.push(getFormattedData(data))
    }

    done()
  }

  return filter
}

/**
 * STREAMS ARE AWESOME!
 * Create the file read stream, instead of reading the
 * whole file at once.
 * Parse the data and convert it into json format.
 * Pipe the data to the filters to get the desired output
 *
 * @param csvFilePath: The path of the imported csv file
 * @param filter: The function to read the file stream data and filter
 */
const parseCsv = (csvFilePath: string, filter) => new Promise((resolve, reject) => {
  const result = []
  const csvToJson = csvStreamify()

  fs.createReadStream(csvFilePath)
    .on('error', e => reject(e))
    .pipe(csvToJson)
    .pipe(filter)
    .on('data', d => result.push(d))
    .on('end', () => { resolve(result) })
    .on('error', error => reject(error))
})

// CSV Operations
const csv = {
  // Upload the file
  import: async (ctx: $Context) => {
    try {
      await clearUploadsDir(fileUploadDirPath)

      const singleFileUpload = upload.single('file');
      singleFileUpload(ctx)

      ctx.status = 200
    } catch (error) {
      ctx.status = 500
    }
  },

  // handles the search operation and responds with the found results
  search: async (ctx: $Context) => {
    try {
      const { body } = ctx.request

      // validate user input
      await validateSchema(body, 'search')

      const { query } = body

      let result
      // check for the data in the cache
      const cachedData = dumbCache.getCache(query)
      if (cachedData) {
        result = cachedData
      } else {
        // filter to pipe the file stream through it
        const queryFilter = getQueryFilter(query)

        const fileName = await getFile()

        result = await parseCsv(path.resolve(fileUploadDirPath, fileName), queryFilter)

        // set the result in the cache to be servred from cache next time
        if (result) dumbCache.setCache(query, result)
      }

      ctx.status = 200
      ctx.body = {
        success: true,
        result,
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = {
        error: true,
        message: error.message,
      }
    }
  },

  // handles autocomplete and respond with the suggestions
  autocomplete: async (ctx: $Context) => {
    try {
      const { query, limit, field } = ctx.query

      // validate the user data
      await validateSchema(ctx.query, 'autoComplete')

      const key = CSV_STRUCTURE_FIELDS.indexOf(field.toLowerCase())
      if (key === -1) {
        throw new Error(`No such field ${field} exists in the csv file.`)
      }

      // filter to pipe the file streams through it
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
  },
}

export default csv
