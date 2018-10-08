// @flow

import packagejson from '../../package.json'

const isDevEnvironment = !['integration', 'prod', 'production'].includes(process.env.NODE_ENV)

const version = isDevEnvironment ? `${packagejson.version}-dev` : packagejson.version

export default version
