const ListaModelo = require('../modelos/lista')

exports.pegarLista = async (req, res, next) => {
    try {
        lista = await ListaModelo.findById(req.params.id)
        if (lista == null)
            return res.status(404).json({
                mensagem: 'GPS não encontrado'
            })
    } catch (error) {
        return res.status(500).json({
            mensagem: error.message || error.statusText || 'Erro ao buscar GPS'
        })
    }
    res.lista = lista
    next()
}


exports.listar = async (req, res) => {
    try {
        const lista = await ListaModelo.find()
        res.json({
            mensagem: `${lista.length} registro(s) encontrado(s).`,
            data: lista
        })
    } catch (error) {
        res.status(500).json({
            mensagem: error.message || error.statusText || "Alguma coisa aconteceu enquanto listava Lista"
        })
    }
}

exports.buscar = async (req, res) => {
    res.json(res.lista)
}

exports.adicionar = async (req, res) => {
    const lista = new ListaModelo(req.body)
    try {
        const novoLista = await lista.save()
        res.status(201).json({
            mensagem: 'Adicionado novo GPS',
            data: novoLista
        })
    } catch (error) {
        res.status(400).json({
            mensagem: error.message || error.statusText || "Alguma coisa aconteceu na busca Lista"
        })
    }
}

exports.atualizar = async (req, res) => {
    for (const key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            res.lista[key] = req.body[key]
        }
    }

    try {
        const lista = await res.lista.save()
        res.json(lista)
    } catch (error) {
        res.status(400).json({
            mensagem: error.message || error.statusText || "Alguma coisa aconteceu ao tentar atualizar Lista"
        })
    }

}

exports.deletar = async (req, res) => {
    try {
        await res.lista.remove()
        res.json({
            mensagem: 'GPS deletado.'
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            mensagem: error.message || error.statusText || "Alguma coisa aconteceu ao tentar deletar Lista"
        })
    }
}