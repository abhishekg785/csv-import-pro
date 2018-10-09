// @flow

import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

import type { Context, Request } from 'koa'
import multer from 'koa-multer'
import cleandir from 'clean-dir'
import csvStreamify from 'csv-streamify'

import { SUPPORTED_MIME_TYPES } from '../constants'

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

const parseCsv = (csvFilePath, query) => new Promise((resolve, reject) => {
  const results = []
  const parser = csvStreamify()

  parser.on('data', (line) => {
    if (line.includes(query)) {
      results.push(line)
    }
  })

  const rs = fs.createReadStream(csvFilePath).pipe(parser)
  rs.on('end', () => {
    resolve(results);
  })
})

const csv = {
  displayPage: async (ctx: Context) => {
    ctx.body = 'displayPage'
  },

  import: async (ctx: $Context) => {
    // clear the uploads dir
    await clearUploadsDir(fileUploadDirPath)

    // uploads the new file
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
        ctx.body = 'No query found'

        return
      }

      const file = await getFile()

      const result = await parseCsv(path.resolve(fileUploadDirPath, file), query)

      ctx.body = result
    } catch (error) {
      // do nothing
      ctx.body = {
        error: 1,
        message: error.message,
      }
    }
  },
}

export default csv
