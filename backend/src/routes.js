import Router from 'koa-router'

import api from './api'

const router = new Router()

router.get('/healthcheck', api.healthcheck.check)

// routes related to csv operations
router.get('/', api.csv.displayPage)
router.post('/import', api.csv.import)
router.post('/search', api.csv.search)
router.get('/autocomplete', api.csv.autocomplete)

export default router
