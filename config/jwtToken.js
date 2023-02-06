const jwt = require('jsonwebtoken')

const generateToken = (id)=>{

    return jwt.sign({id}, 'secret', {expiresIn: "3d"})
}

module.exports ={ generateToken }