const PacienteMedico = require('../models/PacienteMedico_model')
const CancroPaciente = require('../models/CancroPaciente_model')
const Tratamento = require('../models/Tratamento_model')
const Toma = require('../models/Toma_model')

module.exports = function () {
    return async function (req, res) {
        //5 medico id - José Antunes
        PacienteMedico.getAllPacByMecId(5).then(async function (pacientesMedicos) {
            let alldata = []
            for (const pacienteMedico of pacientesMedicos) {
                const paciente = pacienteMedico.paciente
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