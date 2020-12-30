const mongoose  = require('mongoose')
const Double = require('@mongoosejs/double')
const Schema = mongoose.Schema

const Reservas = mongoose.model('Reserva', new Schema({
  agencia_id: {type: Schema.Types.ObjectId, ref:'Agencia'},
  usuario_id: {type: Schema.Types.ObjectId, ref:'Usuario'},
  auto_id:  {type: Schema.Types.ObjectId, ref:'Auto'},
  fecha_inicio: Date,
  fecha_fin: Date,
  monto: Double, 
  estado: String,
}))

module.exports = Reservas
