const TipoCancro = require('../../models/TipoCancro.js')
const TipoTratamento = require('../../models/TipoTratamento')
const Medicacao = require('../../models/Medicacao')

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