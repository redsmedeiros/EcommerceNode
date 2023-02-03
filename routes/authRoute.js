const express = require('express')
const router = express.Router()
const { createUser } = require('../controller/UserController')

//rota de post
router.post('/register', createUser)

module.exports = router