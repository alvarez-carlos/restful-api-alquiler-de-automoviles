
const mongoose = require('mongoose')

const Double = require('@mongoosejs/double')

const Schema = mongoose.Schema

const Autos  = mongoose.model('Auto', new Schema({
  matricula: String,
  marca: String,
  modelo: String,
  disponibilidad: Boolean,
  color: String,
  precio_diario: Double,
  deposito: Double,
}))

module.exports = Autos 
