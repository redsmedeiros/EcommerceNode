const express = require('express')
const router = express.Router()
const { createUser, loginUserController, getAllUser, getUser, deleteUser, updateUser } = require('../controller/UserController')
const { authMiddleware } = require('../middlewares/authMiddleware')

//rotas
router.post('/register', createUser)
router.post('/login', loginUserController)
router.get('/users', getAllUser)
router.get('/:id', authMiddleware, getUser)
router.delete('/:id', deleteUser)
router.put('/:id', updateUser)

module.exports = router