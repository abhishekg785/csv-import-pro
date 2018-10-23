/* eslint-disable no-console */

import config from './config'

const LOG_LEVEL = {
  verbose: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
}

const logger = {
  verbose: (...args) => {
    if (LOG_LEVEL[config.logLevel] <= LOG_LEVEL.verbose) {
      console.verbose(...args)
    }
  },
  debug: (...args) => {
    if (LOG_LEVEL[config.logLevel] <= LOG_LEVEL.debug) {
      console.debug(...args)
    }
  },
  info: (...args) => {
    if (LOG_LEVEL[config.logLevel] <= LOG_LEVEL.info) {
      console.log('\x1b[32m', ...args, '\x1b[0m')
    }
  },
  warn: (...args) => {
    if (LOG_LEVEL[config.logLevel] <= LOG_LEVEL.warn) {
      console.warn('\x1b[33m', ...args, '\x1b[0m')
    }
  },
  error: (...args) => {
    if (LOG_LEVEL[config.logLevel] <= LOG_LEVEL.error) {
      console.error('\x1b[31m', ...args, '\x1b[0m')
    }
  },
  captureError: (error) => {
    // send the error to sentry or for other purposes.
  },
}

export default logger
