
const jwt = require('jsonwebtoken')
const Usuarios = require('../models/Usuarios')

// module.exports = (req, res, next) =>
const autenticado = (req, res, next) => {
  const token = req.headers.token //authorization
  const key = req.headers.key //authorization
  if (!token) {
    return res.sendStatus(403)
  }
  
  if (!key){
    return res.sendStatus(403)
  }
 
  jwt.verify(token, key, (err, decoded) => {
    const { _id } = decoded
     Usuarios.findOne({ _id }).exec()
       .then(usuario => {
         if(!usuario){
           return res.sendStatus(403)
         }
         req.user = usuario
         next()
       })
  })
}

const autorizado = roles => (req, res, next) => {
  if (roles.indexOf(req.user.role) > -1){
     return next()
  }
  res.sendStatus(403)
}

module.exports = {
  autenticado,
  autorizado,
}
