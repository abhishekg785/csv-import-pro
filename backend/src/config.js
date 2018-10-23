// @flow

import env from 'dotenv'

env.config()

const config = {
  appName: 'csv-import-backend',
  env: process.env.NODE_ENV || 'dev',
  logLevel: process.env.LOG_LEVEL || 'error',
  ports: {
    http: Number.parseInt(process.env.APP_HTTP_PORT || '3000', 10) || 3000,
  },
  appTimeout: Number.parseInt(process.env.APP_TIMEOUT || '', 10) || 4000,
  redis: {
    host: String(process.env.REDIS_HOST) || '127.0.0.1',
    port: Number.parseInt(process.env.REDIS_PORT || '6379', 10) || 6379,
    defaultDurationSeconds: Number.parseInt(process.env.REDIS_DEFAULT_DURATION_SECOND || '86400', 10) || 86400,
  },
}

export default config
