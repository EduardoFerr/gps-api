const usuarioModelo = require('../modelos/usuario')

exports.pegarUsuario = async (req, res, next) => {
    try {
        usuario = await usuarioModelo.findById(req.params.id)
        if (usuario == null)
            return res.status(404).json({
                mensagem: 'usuário não encontrado'
            })
    } catch (error) {
        return res.status(500).json({
            mensagem: error.message || error.statusText || 'Erro ao buscar usuário'
        })
    }
    res.usuario = usuario
    next()
}


exports.listar = async (req, res) => {
    try {
        const usuario = await usuarioModelo.find()
        res.json({
            mensagem: `${usuario.length} registro(s) encontrado(s).`,
            data: usuario
        })
    } catch (error) {
        res.status(500).json({
            mensagem: error.message || error.statusText || "Alguma coisa aconteceu enquanto listava usuário"
        })
    }
}

exports.buscar = async (req, res) => {
    res.json(res.usuario)
}

exports.adicionar = async (req, res) => {
    const usuario = new usuarioModelo(req.body)
    try {
        const novoUsuario = await usuario.save()
        res.status(201).json({
            mensagem: 'Adicionado novo usuário',
            data: novoUsuario
        })
    } catch (error) {
        res.status(400).json({
            mensagem: error.message || error.statusText || "Alguma coisa aconteceu na busca usuário"
        })
    }
}

exports.atualizar = async (req, res) => {
    for (const key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            res.usuario[key] = req.body[key]
        }
    }

    try {
        const usuario = await res.usuario.save()
        res.json(usuario)
    } catch (error) {
        res.status(400).json({
            mensagem: error.message || error.statusText || "Alguma coisa aconteceu ao tentar atualizar usuário"
        })
    }

}

exports.deletar = async (req, res) => {
    try {
        await res.usuario.remove()
        res.json({
            mensagem: 'usuário deletado.'
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            mensagem: error.message || error.statusText || "Alguma coisa aconteceu ao tentar deletar usuário"
        })
    }
}