const mongoose = require('mongoose')

const SchemaGPS = new mongoose.Schema({
    nome: {
        type: String,
        trim: true,
        required: true
    },
    idade: {
        type: Number,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Gps', SchemaGPS)