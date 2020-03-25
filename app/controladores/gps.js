const GpsModelo = require('../modelos/gps')

exports.pegarGps = async (req, res, next) => {
    try {
        gps = await GpsModelo.findById(req.params.id)
        if (gps == null)
            return res.status(404).json({
                mensagem: 'GPS não encontrado'
            })
    } catch (error) {
        return res.status(500).json({
            mensagem: error.message || error.statusText || 'Erro ao buscar GPS'
        })
    }
    res.gps = gps
    next()
}


exports.listar = async (req, res) => {
    try {
        const gps = await GpsModelo.find()
        res.json({
            mensagem: `${gps.length} registro(s) encontrado(s).`,
            data: gps
        })
    } catch (error) {
        res.status(500).json({
            mensagem: error.message || error.statusText || "Alguma coisa aconteceu enquanto listava Gps"
        })
    }
}

exports.buscar = async (req, res) => {
    res.json(res.gps)
}

exports.adicionar = async (req, res) => {
    const gps = new GpsModelo(req.body)
    try {
        const novoGps = await gps.save()
        res.status(201).json({
            mensagem: 'Adicionado novo GPS',
            data: novoGps
        })
    } catch (error) {
        res.status(400).json({
            mensagem: error.message || error.statusText || "Alguma coisa aconteceu na busca Gps"
        })
    }
}

exports.atualizar = async (req, res) => {
    for (const key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            res.gps[key] = req.body[key]
        }
    }

    try {
        const gps = await res.gps.save()
        res.json(gps)
    } catch (error) {
        res.status(400).json({
            mensagem: error.message || error.statusText || "Alguma coisa aconteceu ao tentar atualizar Gps"
        })
    }

}

exports.deletar = async (req, res) => {
    try {
        await res.gps.remove()
        res.json({
            mensagem: 'GPS deletado.'
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            mensagem: error.message || error.statusText || "Alguma coisa aconteceu ao tentar deletar Gps"
        })
    }
}