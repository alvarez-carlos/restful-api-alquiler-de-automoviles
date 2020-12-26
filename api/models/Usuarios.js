
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Usuarios = mongoose.model('Usuario', new Schema({
  cedula: String,
  nombre: String,
  apellido: String,
  correo: String,
  direccion: String,
  contacto: String,
  clave: String,
  salt: String,
  role: String, //usuario, administrador 
 }))

module.exports = Usuarios 
