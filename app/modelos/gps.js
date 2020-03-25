const mongoose = require('mongoose')

const SchemaGPS = new mongoose.Schema({
    nome: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    nascimento: {
        type: Date,
        required: true
    },
    telefone: {
        type: String,
        trim: true,
        required: true
    },
    sexo: {
        type: String,
        enum: ['Masculino', 'Feminino'],
        required: true
    },
    orientacao: {
        type: String,
        trim: true,
        required: true
    }
}, 
{
    timestamps: true
})

module.exports = mongoose.model('Gps', SchemaGPS)