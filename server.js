require('dotenv').config()
const express = require('express')
const app = express()
const db = require('./config/database')
const gps = require('./rotas/gps')
const PORT = process.env.PORT || 3001


app.use(express.json())
app.use('/api', gps)

db.then(
    (conexao) => {
        console.log(`Estado do banco de dados: ${conexao.states[conexao.readyState]}`)
        app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}!`))
    }
).catch(err => console.log(err))
