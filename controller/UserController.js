const User = require('../models/UserModel')

const createUser = async (req, res) =>{

    //receber do corpo da requisição a variável de email
    const email = req.body.email

    //verificar se tem um usuario com esse email
    const findUser = await User.findOne({email: email})

    //verificar se veio um usuario
    if(findUser){
        //usuario já existe e retornar mensagem
        res.status(422).json({message: 'Usuário já existe'})
    }

    //criar um usuario atraves do model
    const newUser = User.create(req.body)

    res.status(200).json(newUser)
}

module.exports = { createUser }