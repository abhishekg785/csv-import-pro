// @flow

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'

import config from './config'
import routes from './routes'

import middlewares from './middlewares'
import appVersion from './utils/version'

function server() {
  const app = new Koa()

  app.use(async (ctx, next) => {
    ctx.set('X-App-Version', appVersion)
    await next()
  })

  app.use(bodyParser({ enableTypes: ['json'] }))

  app.use(middlewares.swagger())
  app.use(routes.routes())

  // use it to send the app error to sentry etc
  app.on('error', (err) => {
    // eslint-disable-next-line no-console
    console.log(err)
  })

  const appServer = app.listen(config.ports.http, () => {
    // eslint-disable-next-line no-console
    console.log('start csv-import service at port', config.ports.http)
  })

  appServer.setTimeout(config.setTimeout)
}

export default server
