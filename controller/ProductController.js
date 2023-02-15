//importar o model
const Product = require('../models/ProductModel')

//importações
const asyncHandler = require('express-async-handler')

//metodos
const createProduct = asyncHandler(async (req, res)=>{
    
    //criar o produto no banco - validações feitas no model
    try{
        const newProduct = await Product.create(req.body)

        res.json({newProduct})

    }catch(error){
        throw new Error(error)
    }
})

const getProduct = asyncHandler(async (req, res)=>{

    const { id } = req.params

    //pegar o produto no banco
    try{

        const findProduct = await Product.findById(id)

        res.json({findProduct}) //2:40:04

    }catch(error){
        throw new Error(error)
    }

})


//exportação dos metodos por destructing
module.exports = {
    createProduct,
    getProduct
}