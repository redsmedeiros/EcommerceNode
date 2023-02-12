//importar o mongoose
const mongoose = require('mongoose')

//função de validação do id
const validadeMongoDbId = (id)=>{

    const isValid = mongoose.Types.ObjectId.isValid(id)

    //se não for valido lançar o erro
    if(!isValid) throw new Error('Id inválido ou não encontrado')
}

module.exports = validadeMongoDbId