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

                console.log(decoded)
            }

        }catch(error){
            
            throw new Error('Sem Autorização, faça o login novamente')
        }

    }else{

        throw new Error('Não existe token no headers')
    }
})

module.exports = {authMiddleware}