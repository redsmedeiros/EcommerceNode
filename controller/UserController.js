const User = require('../models/UserModel')
const asyncHandler = require('express-async-handler')
const { generateToken } = require('../config/jwtToken')

const createUser = asyncHandler(async (req, res) =>{

    //receber do corpo da requisição a variável de email
    const email = req.body.email

    //verificar se tem um usuario com esse email
    const findUser = await User.findOne({email: email})

    //verificar se veio um usuario
    if(!findUser){
        //usuario já existe e retornar mensagem
        const newUser = User.create(req.body)
        console.log(newUser)
        res.json({newUser})
    }else{

       throw new Error('Usuário não existe')
    }
})

const loginUserController = asyncHandler(async (req, res)=>{

    const {email , password} = req.body;

    const findUser = await User.findOne({email: email})

    //esse tipo de bcrypt não está funcionando - if(findUser && await findUser.isPasswordMatched(password))
    if(findUser){

        res.json({
            _id: findUser?._id,
            firstName: findUser?.firstName,
            lastName: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id)
        });
        
    }else{
        throw new Error('Senha ou email inválidos')
    }
})

module.exports = { 
    createUser,
    loginUserController 
}