
const mongoose = require('mongoose')

const Double = require('@mongoosejs/double')

const Schema = mongoose.Schema

const Autos  = mongoose.model('Auto', new Schema({
  agencia_id:{type: Schema.Types.ObjectId, ref:'Agencia'},
  matricula: String,
  marca: String,
  modelo: String,
  disponibilidad: Boolean,
  color: String,
  precio_diario: Double,
  deposito: Double,
  link:String,
}))

module.exports = Autos 
