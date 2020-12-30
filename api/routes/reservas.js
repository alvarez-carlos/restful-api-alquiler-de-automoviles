const express = require('express')
const Reservas = require('../models/Reservas')
const Agencias = require('../models/Agencias')
const Autos = require('../models/Autos')

const { autenticado , autorizado } = require('../autorizacion')

const router = express.Router()

//Listar todas las reservas
router.get('/', autenticado, (req, res) => {
   const { _id } = req.user
   Reservas.find({ usuario_id: _id})
    .exec()
    .then(response => {
       res.status(200).send(response)
    })
})

//Obtener una reserva especifica por su id
router.get('/:id', autenticado,(req, res) => {
  Reservas.findById(req.params.id)
    .exec()
    .then(response => res.status(200).send(response))
})
 
//Crear Reserva
router.post('/', autenticado, (req, res) => {
  const { agencia_id, auto_id, fecha_inicio, fecha_fin, monto, estado } = req.body
  const { _id } = req.user
  Reservas.create({
    agencia_id:agencia_id, 
    usuario_id: _id,
    auto_id: auto_id,
    fecha_inicio, 
    fecha_fin, 
    monto, 
    estado,		
  }).then(response => res.status(201).send(response))
})

//Actualizar una reserva por su id
router.put('/:id', autenticado,(req, res) => {
  Reservas.findOneAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(204))
})

//Elimiar una reserva por su id
router.delete('/:id', autenticado,(req, res) => {
  Reservas.findOneAndDelete(req.params.id)
    .exec()
    .then(() => res.sendStatus(204))
})

module.exports = router
