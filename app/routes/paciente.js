const Paciente = require('../models/Paciente')
const CancroPaciente = require('../models/CancroPaciente')
const Tratamento = require('../models/Tratamento')
const Toma = require('../models/Toma')

module.exports = function () {
    return async function (req, res) {
        Paciente.getOneById(parseInt(req.params.id)).then(async function (paciente) {
            let data = await Promise.all([CancroPaciente.getAllByPacId(paciente.id), Tratamento.getAllByPacId(paciente.id), Toma.getAllByPacId(paciente.id)])
            res.send({
                nome: paciente.pessoa.nome,
                sexo: paciente.pessoa.sexo,
                idade: paciente.pessoa.idade,
                dnsc: paciente.dnsc,
                peso: paciente.peso,
                altura: paciente.altura,
                patologia: data[0].map(function (pat) { return { tipo: pat.tipo.diag, est: pat.est } }),
                tratamento: data[1].map(function (tra) { return tra.tipo.diag }),
                medicacao: data[2].map(function (med) { return med.mdc.nome })
            })
        })
    }
}