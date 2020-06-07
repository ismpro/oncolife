const TipoCancro = require('../models/TipoCancro_model.js')
const TipoTratamento = require('../models/TipoTratamento_model')
const Medicacao = require('../models/Medicacao_model')

module.exports = function () {
    return async function (req, res) {

        let data = await Promise.all([TipoCancro.getAll(), Medicacao.getAll(), TipoTratamento.getAll()])
        res.send({
            tipocancro: data[0],
            tipotratamento: data[2],
            medicacao: data[1],
        })
    }
}