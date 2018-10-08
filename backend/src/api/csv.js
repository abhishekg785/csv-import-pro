// @flow

import type { Context, Request } from 'koa'

type $Context = {
  ...Context,
  request: {
    ...Request,
    body: Object,
  },
}

const csv = {
  displayPage: async (ctx: Context) => {
    ctx.body = 'displayPage'
  },

  import: async (ctx: $Context) => {
    ctx.body = 'import'
  },

  search: async (ctx: $Context) => {
    ctx.body = 'search'
  },
}

export default csv
