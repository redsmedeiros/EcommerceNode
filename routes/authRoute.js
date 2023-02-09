const express = require('express')
const router = express.Router()
const { createUser, loginUserController, getAllUser, getUser, deleteUser, updateUser } = require('../controller/UserController')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')

//rotas 1:22:58
router.post('/register', createUser)
router.post('/login', loginUserController)
router.get('/users', getAllUser)
router.get('/:id', authMiddleware, isAdmin, getUser)
router.delete('/:id', deleteUser)
router.put('/edit-user',authMiddleware, updateUser)
router.put('/block-user/:id', authMiddleware, isAdmin, updateUser)
router.put('/unblock-user/:id', authMiddleware, isAdmin, updateUser)

module.exports = router