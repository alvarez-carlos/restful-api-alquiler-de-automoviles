const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Agencias  = mongoose.model('Agencia', new Schema({
   nombre: String,
   contacto: String,
   correo: String,
   direccion: String,
}))

module.exports = Agencias
