const express = require('express')
const cors = require('cors')
const dbConnect = require('./config/dbConnect');
const authRouter = require('./routes/authRoute')
const bodyParse = require('body-parser');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

//criação da aplicação e conectar com o banco
const app = express()
dbConnect();

//congifurações
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended: false}))
app.use(express.json())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
const dotenv = require('dotenv').config()
const PORT = 5000


//rotas - chama o arquivo de rotas e executada como callback
app.use('/api/user', authRouter)

//middlawares
app.use(notFound)
app.use(errorHandler)

//escutar a porta
app.listen(PORT, ()=>{
    console.log('Servidor rodando')
})