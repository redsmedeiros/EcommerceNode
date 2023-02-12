const User = require('../models/UserModel')
const asyncHandler = require('express-async-handler')
const { generateToken } = require('../config/jwtToken')
const validateMongoDbId = require('../utils/validateMongoDbId')
const generateRefreshToken = require('../config/refresh-token')
const jwt = require('jsonwebtoken')

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

        const refreshToken = await generateRefreshToken(findUser?._id)

        const updatedUser = await User.findByIdAndUpdate(findUser.id, {
            refreshToken: refreshToken
        }, {new: true})

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72*60*60*1000
        })

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

const handleRefreshToken = asyncHandler( async (req, res)=>{

    const cookie = req.cookies

    if(!cookie?.refreshToken) throw new Error('Sem token nos cookies')

    const refreshToken = cookie.refreshToken

    const user = await User.findOne({refreshToken})

    if(!user) throw new Error('Usuário não encontrado')

    jwt.verify(refreshToken, 'nossosecret', (err, decoded =>{

        if(err || decoded.id !== user.id){

            throw new Error('Algo deu errado')
        }

        const accessToken = generateToken(user?._id)

        res.json({ accessToken })
    }))

})

const getAllUser = asyncHandler( async (req, res)=>{

    try{

        const getUsers = await User.find()

        res.json({getUsers})

    }catch(error){

        throw new Error(error)

    }
})

const getUser = asyncHandler( async (req, res)=>{

    const { id } = req.user

    try{

        const getUser = await User.findById(id)

        res.json({getUser})

    }catch(error){

        throw new error(error)
    }

})

const deleteUser = asyncHandler(async (req, res)=>{

    const { id } = req.params

    validateMongoDbId(_id) 

    try{

        const deletedUser = await User.findByIdAndDelete(id)

        res.json({deletedUser})

    }catch(error){

        throw new error(error)
    }

  
})

const updateUser = asyncHandler(async (req, res)=>{

    const { _id } = req.user

    validateMongoDbId(_id) 

    try{

        const updateUser = await User.findByIdAndUpdate(_id, {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile
        },{
            new: true
        })

        res.json({updateUser})

    }catch(error){

        throw new Error(error)
    }
})

const blockUser = asyncHandler(async (req, res)=>{

    //pegar o id dos params da requisição
    const { id } = req.params

    try{

        //pegar por id e atualizar o usuario para bloqueado
        const block = await User.findByIdAndUpdate(id, {isBlocked: true}, {new: true})

        res.json({message: 'Usuário Bloqueado'})



    }catch(error){

        throw new Error(error)
    }

})

const unblockUser = asyncHandler(async (req, res)=>{

    //pegar o id dos params da requisição
    const { id } = req.params

    validateMongoDbId(_id) 

    try{

        //pegar por id e atualizar o usuario para bloqueado
        const unblock = await User.findByIdAndUpdate(id, {isBlocked: false}, {new: true})

        res.json({message: 'Usuário desbloqueado'})

    }catch(error){

        throw new Error(error)
    }

})

const logout = asyncHandler(async (req, res)=>{

    //pegar o cookie pela requisição
    const cookie = req.cookies

    //verificar se existe um token no cookie
    if(!cookie?.refreshToken) throw new Error('Sem token nos cookies')

    //pegar o token
    const refreshToken = cookie.refreshToken

    //encontrar um usuario com esse token
    const user = await User.findOne({refreshToken}) //02:13:47

})

module.exports = { 
    createUser,
    loginUserController,
    getAllUser,
    getUser,
    deleteUser,
    updateUser,
    blockUser,
    unblockUser,
    handleRefreshToken,
    logout 
}