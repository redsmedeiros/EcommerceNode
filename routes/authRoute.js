const express = require('express')
const router = express.Router()
const { createUser, loginUserController, getAllUser, getUser, deleteUser, updateUser, blockUser, unblockUser, handleRefreshToken } = require('../controller/UserController')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')


router.post('/register', createUser)
router.post('/login', loginUserController)
router.get('/users', getAllUser)
router.get('/refresh', handleRefreshToken)
router.get('/:id', authMiddleware, isAdmin, getUser)
router.delete('/:id', deleteUser)
router.put('/edit-user',authMiddleware, updateUser)
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser)
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser)


module.exports = router