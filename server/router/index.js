import { Router } from 'express'

import * as Api from './api/index.js'

const router = new Router()

router.get('/articles', Api.getAllArticles)
router.get('/article/:id', Api.getArticle)
router.post('/article', Api.createArticle)
router.put('/article/:id', Api.updateArticle)
router.delete('/article/:id', Api.deleteArticle)

export default router