import env from 'dotenv'

env.config()

const config = {
  appName: 'csv-import-backend',
  env: process.env.NODE_ENV || 'dev',
  ports: {
    http: Number.parseInt(process.env.APP_HTTP_PORT || 3000, 10) || 3000,
  },
  appTimeout: Number.parseInt(process.env.APP_TIMEOUT || '', 10) || 4000,
}

export default config
