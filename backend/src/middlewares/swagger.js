// @flow

import fs from 'fs'
import path from 'path'
import Router from 'koa-router'
import { promisify } from 'util'

import appVersion from '../utils/version'

const readFile = promisify(fs.readFile)

function swagger() {
  const router = new Router()

  router.get('/api', async (ctx) => {
    ctx.type = 'text/html; charset=UTF-8'
    const swaggerHtml = await readFile(path.resolve(__dirname, '..', 'public', 'swagger.html'))
    ctx.body = swaggerHtml.toString()
  })

  router.get('/api/swagger.yml', async (ctx) => {
    ctx.type = 'text/yaml; charset=UTF-8'
    const swaggerDefinition = await readFile(path.resolve(__dirname, '..', 'public', 'swagger.yml'))
    ctx.body = swaggerDefinition.toString().replace('__VERSION__', appVersion)
  })

  return router.routes()
}

export default swagger
