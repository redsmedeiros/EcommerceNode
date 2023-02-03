const User = require('../models/UserModel')
const asyncHandler = require('express-async-handler')

const createUser = asyncHandler(async (req, res) =>{

    //receber do corpo da requisição a variável de email
    const email = req.body.email

    //verificar se tem um usuario com esse email
    const findUser = await User.findOne({email: email})

    //verificar se veio um usuario
    if(!findUser){
        //usuario já existe e retornar mensagem
        const newUser = User.create(req.body)
        res.json(newUser)
    }else{

       throw new Error('Usuário não existe')
    }
})

module.exports = { createUser }