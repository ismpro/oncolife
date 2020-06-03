const Paciente = require('../../models/Paciente')
const CancroPaciente = require('../../models/CancroPaciente')
const Tratamento = require('../../models/Tratamento')
const Toma = require('../../models/Toma')

module.exports = function () {
    return async function (req, res) {
        //5 medico id - José Antunes
        Paciente.getAllByMecId(5).then(async function (pacientes) {
            let alldata = []
            for (const paciente of pacientes) {
                let data = await Promise.all([CancroPaciente.getAllByPacId(paciente.id), Tratamento.getAllByPacId(paciente.id), Toma.getAllByPacId(paciente.id)])
                alldata.push({
                    id: paciente.id,
                    nome: paciente.pessoa.nome,
                    sexo: paciente.pessoa.sexo,
                    patologia: data[0].map(function (pat) { return pat.tipo.diag }),
                    tratamento: data[1].map(function (tra) { return tra.tipo.diag }),
                    medicacao: data[2].map(function (med) { return med.mdc.nome })
                })
            }
            res.send(alldata)
        })
    }
}