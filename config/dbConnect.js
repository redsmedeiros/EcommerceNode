const { mongoose } = require('mongoose') 

const dbConnect = async ()=>{

    mongoose.set("strictQuery", true);
    await mongoose.connect('mongodb://127.0.0.1:27017/ecommerceNode')

    console.log('Conectado ao MONGO')

}

dbConnect().catch((err)=> console.log(err))

module.exports = dbConnect;