const express = require('express')
const Autos = require('../models/Autos')
const { autenticado , autorizado } = require('../autorizacion')
const router = express.Router()
 
//Listar todos autos
router.get('/', autenticado , (req, res) => {
  Autos.find({ disponibilidad: true })
    .exec()
    .then(response => res.status(200).send(response))
})

//Obtener un auto especifico por su id
router.get('/:id', autenticado , (req, res) => {
  Autos.findById(req.params.id)
    .exec()
    .then(response => res.status(200).send(response))
})

//Crear Auto
router.post('/', autenticado , (req, res) => {
  Autos.create(req.body)
    .then(response => res.status(201).send(response))
})

//Actualizar un auto por su id
router.put('/:id', autenticado , (req, res) => {
//  const { disponibilidad } = req.body
  Autos.findOneAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(204))
})

//Elimiar un auto por su id
router.delete('/:id', autenticado ,(req, res) => {
  Autos.findOneAndDelete(req.params.id)
    .exec()
    .then(() => res.sendStatus(204))
})

module.exports = router
