const express = require('express')
const router = express.Router()
const { createUser, loginUserController } = require('../controller/UserController')

//rota de post
router.post('/register', createUser)
router.post('/login', loginUserController)

module.exports = router