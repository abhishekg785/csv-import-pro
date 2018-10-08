import Router from 'koa-router'
import httpStatusCodes from 'http-status-codes'

import api from './api'

const router = new Router()

router.get('/healthcheck', api.healthcheck.check)

// routes related to csv operations
router.get('/', api.csv.displayPage)
router.post('/import', api.csv.import)
router.post('/search', api.csv.search)

export default router
