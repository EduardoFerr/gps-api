const express = require('express')
const router = express.Router()
const controlador = require('../app/controladores/gps')

router.get('/gps', controlador.listar)
router.get('/gps/:id', controlador.pegarGps, controlador.buscar)
router.post('/gps', controlador.adicionar)
router.patch('/gps/:id', controlador.pegarGps, controlador.atualizar)
router.delete('/gps/:id', controlador.pegarGps, controlador.deletar)

module.exports = router