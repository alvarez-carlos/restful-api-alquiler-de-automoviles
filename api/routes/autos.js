const express = require('express')
const Autos = require('../models/Autos')

const router = express.Router()

//Listar todos autos
router.get('/', (req, res) => {
  Autos.find()
    .exec()
    .then(response => res.status(200).send(response))
})

//Obtener un auto especifico por su id
router.get('/:id', (req, res) => {
  Autos.findById(req.params.id)
    .exec()
    .then(response => res.status(200).send(response))
})

//Crear Auto
router.post('/', (req, res) => {
  Autos.create(req.body)
    .then(response => res.status(201).send(response))
})

//Actualizar un auto por su id
router.put('/:id', (req, res) => {
  Autos.findOneAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(204))
})

//Elimiar un auto por su id
router.delete('/:id', (req, res) => {
  Autos.findOneAndDelete(req.params.id)
    .exec()
    .then(() => res.sendStatus(204))
})

module.exports = router
