const mongoose = require('mongoose')
const gpsModelo = require('./gps')

const SchemaLista = new mongoose.Schema({
    lista: [gpsModelo.schema],
},
{
    timestamps: true
})

module.exports = mongoose.model('Lista', SchemaLista)