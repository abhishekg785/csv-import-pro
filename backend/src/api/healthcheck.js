// @flow

import httpStatusCodes from 'http-status-codes'

import type { Context } from 'koa'

const healthcheck = {
  check: (ctx: Context) => {
    ctx.status = httpStatusCodes.NO_CONTENT
  },
}

export default healthcheck
