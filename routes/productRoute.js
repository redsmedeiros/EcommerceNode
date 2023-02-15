//importações
const express = require('express')
const { createProduct, getProduct } = require('../controller/ProductController')

//instancia o Router
const router = express.Router()

//rotas
router.post('/', createProduct)
router.get('/:id', getProduct)




module.exports = router