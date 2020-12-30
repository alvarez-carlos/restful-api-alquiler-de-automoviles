const express = require('express')
const Agencias = require('../models/Agencias')
const { autenticado , autorizado } = require('../autorizacion')

const router = express.Router()

//Listar las todas agencias
router.get('/', autenticado ,(req, res) => {
  Agencias.find()
    .exec()
    .then(response => res.status(200).send(response))
})

//Obtener una agencia especifica por su id
router.get('/:id', autenticado ,(req, res) => {
  Agencias.findById(req.params.id)
    .exec()
    .then(response => res.status(200).send(response))
})

//Crear Agencia
router.post('/', autenticado ,(req, res) => {
  Agencias.create(req.body)
    .then(response => res.status(201).send(response))
})

//Actualizar agencia por su id
router.put('/:id', autenticado ,(req, res) => {
  Agencias.findOneAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(204))
})

//Elimiar una agencia por su id
router.delete('/:id', autenticado ,(req, res) => {
  Agencias.findOneAndDelete(req.params.id)
    .exec()
    .then(() => res.sendStatus(204))
})

module.exports = router
