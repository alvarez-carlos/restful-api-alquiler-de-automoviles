//Dependencias
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

//Rutas
const Agencias = require('./routes/agencias')
const Autos = require('./routes/autos')
const Usuarios = require('./routes/usuarios')
//const Reservas = require('./routes/reservas')

//Creo mi app express
const app = express()

//Agrego las dependencias importadas a mi app express
app.use(bodyParser.json())
app.use(cors())

//Conexion a la base de datos de Mongo
mongoose.connect(process.env.MONGO_DB_CR, { useNewUrlParser: true, useUnifiedTopology: true })

//Redireccionamiento del cliente a nuestros endpoints dependiento de las rutas 
app.use('/api/agencias', Agencias)
app.use('/api/autos', Autos)
app.use('/api/usuarios', Usuarios)
//app.use('/api/reservas', Reservas)

module.exports = app

