const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')

const authMiddleware = asyncHandler(async(req, res, next)=>{
    
    let token;

    if(req?.headers?.authorization?.startsWith('Bearer')){

        token = req.headers.authorization.split(' ')[1]

        try{

            if(token){
                
                const decoded = jwt.verify(token, 'secret')

                const user = await User.findById(decoded?.id)

                req.user = user

                next()
            }

        }catch(error){
            
            throw new Error('Sem Autorização, faça o login novamente')
        }

    }else{

        throw new Error('Não existe token no headers')
    }
})

const isAdmin = asyncHandler(async(req, res, next)=>{

    const { email } = req.user

    const adminUser = await User.findOne({email: email})

    if(adminUser.role !== 'admin'){

        throw new Error('Você não é administador')
    }else{
        next()
    }

})

module.exports = {authMiddleware, isAdmin} //1:26:52