const express = require('express')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const Usuarios = require('../models/Usuarios')
const router = express.Router()

//sign token
const creaToken = (_id, salt) => {
  return jwt.sign({ _id }, salt.toString(), {
    expiresIn: 60 * 60 * 24 * 365,
  })
}

//Lista todos los usuario
router.get('/', (req, res) => {
  Usuarios.find()
    .exec()
    .then(response => res.status(200).send(response))
})

//Consulta usuario por su id
router.get('/:id', (req, res) => {
  Usuarios.findById(req.params.id)
    .exec()
    .then(usuario => {
      if(!usuario){
        return res.send('EL usuario no existe')
      }
      res.status(200).send(usuario)
    })
})

//Obten tus datos una ves estes autenticado
router.get('/me', (req, res) => {
  res.send(req.user)
})


//Registrar usuario
router.post('/registrar', (req, res) => {
  const { cedula, nombre, apellido, correo, direccion, contacto, clave, role } = req.body
  Usuarios.findOne({ cedula }).exec()
    .then(usuario_por_cedula => {
      if(usuario_por_cedula){
        return res.send('Cedula ya existe')
      }
      Usuarios.findOne({ correo }).exec()
        .then(usuario_por_correo => {
	  if (usuario_por_correo){
             return res.send('Correo ya existe')
	  }
	  crypto.randomBytes(16, (err, salt_buffer) => {
    	    const salt_string = salt_buffer.toString('base64')	
	    crypto.pbkdf2(clave, salt_string, 15000, 64, 'sha1', (err, clave_encriptada_buffer) => {
 	     const clave_encriptada_string =  clave_encriptada_buffer.toString('base64') 
	      Usuarios.create({
	          cedula,
		  nombre,
		  apellido,
		  correo,
		  direccion,
		  contacto,
		  clave: clave_encriptada_string,
		  salt: salt_string,
		  role,
	      }).then(() => {
         	  res.send('Usuario creado con exito')
	        })
	    })
	 })
      })
   })
})

//actualiza usuario
router.put('/:id', (req, res) => {
  const { cedula, nombre, apellido, correo, direccion, contacto, clave, role } = req.body
  Usuarios.findOne(req.params.id).exec()
  .then( usuario => {
    if(!usuario){
      return res.send('usuario no existe')
    }
    crypto.pbkdf2(clave, usuario.salt, 15000, 64, 'sha1', (err, clave_encriptada_buffer) => {
 	     const clave_encriptada_string =  clave_encriptada_buffer.toString('base64') 
	      Usuarios.create({
	          cedula,
		  nombre,
		  apellido,
		  correo,
		  direccion,
		  contacto,
		  clave: clave_encriptada_string,
		  salt: usuario.salt,
		  role,
	     }).then(() => res.sendStatus(204))
        })
    })
})


//LogIn
router.post('/loguear', (req, res) => {
  const { correo, clave } = req.body
  Usuarios.findOne({ correo }).exec()
    .then(usuario => {
      if(!usuario){
        return res.send('Usuario y/o Clave Inconrrecta')
      }
      crypto.pbkdf2(clave, usuario.salt, 15000, 64, 'sha1', (err, clave_buffer) => {
        const clave_encriptada_string = clave_buffer.toString('base64')
	if (usuario.clave === clave_encriptada_string){
          const token = creaToken(usuario._id, usuario.salt)
          return res.send({ token })
	}
	res.send('Usuario y/o clave Incorrecta')
      })
    }) 
})

//Elimina usuario
router.delete('/:id', (req, res) => {
  Usuarios.findOneAndDelete(req.params.id)
    .exec()
    .then(() => res.sendStatus(204))
})

module.exports = router


