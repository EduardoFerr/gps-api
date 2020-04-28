const express = require('express')
const router = express.Router()
const gps = require('./app/controladores/gps')
const usuario = require('./app/controladores/usuario')

router.get('/usuario', usuario.listar)
router.get('/usuario/:id', usuario.pegarUsuario, usuario.buscar)
router.post('/usuario', usuario.adicionar)
router.patch('/usuario/:id', usuario.pegarUsuario, usuario.atualizar)
router.delete('/usuario/:id', usuario.pegarUsuario, usuario.deletar)

router.get('/gps', gps.listar)
router.get('/gps/:id', gps.pegarGps, gps.buscar)
router.post('/gps', gps.adicionar)
router.patch('/gps/:id', gps.pegarGps, gps.atualizar)
router.delete('/gps/:id', gps.pegarGps, gps.deletar)

module.exports = router