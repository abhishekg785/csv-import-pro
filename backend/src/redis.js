// @flow

import redis from 'redis'

import config from './config'
import logger from './logger'

const client = redis.createClient(
  config.redis.port,
  config.redis.host,
)
  .on('ready', () => { logger.warn('Redis connection: ready') })
  .on('reconnecting', () => { logger.warn('Redis connection: reconnecting') })
  .on('connect', () => { logger.info('Redis connection: connected') })
  .on('error', (error) => { logger.warn(error.message) })


const createInstance = () => {
  const instance = {
    get: async (key: string): Promise<any> => {
      if (!client.connected) return null

      return new Promise((resolve, reject) => {
        client.get(key, (error, data) => {
          if (error) {
            return reject(error)
          }

          return resolve(data ? JSON.parse(data) : null)
        })
      })
    },
    set: async (
      key: string,
      value: Object,
      duration: number = config.redis.defaultDurationSeconds,
    ): Promise<any> => {
      if (!client.connected) return null

      return new Promise((resolve, reject) => {
        client.set(key, JSON.stringify(value), 'EX', duration, (error, data) => {
          if (error) {
            return reject(error)
          }

          return resolve(data ? JSON.parse(data) : null)
        })
      })
    },
    flushall: async () => {
      if (!client.connected) return null

      return new Promise((resolve, reject) => {
        client.flushall((error, data) => {
          if (error) {
            return reject(error)
          }

          return resolve(data ? JSON.parse(data) : null)
        })
      })
    },
  }

  return instance
}

const instance = createInstance()

const database = {
  getInstance: () => instance,
}

export default database
