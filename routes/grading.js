const Paciente = require('../models/Paciente_model')
const CancroPaciente = require('../models/CancroPaciente_model')
const Tratamento = require('../models/Tratamento_model')
const PacienteMedico = require('../models/PacienteMedico_model')

module.exports = function () {
    return async function (req, res) {
        Paciente.getOneById(parseInt(req.params.id)).then(async function (paciente) {
            let data = await Promise.all([CancroPaciente.getAllByPacId(paciente.id), Tratamento.getAllByPacId(paciente.id), PacienteMedico.getAllMedByPacId(paciente.id)])

            let cancropaciente = data[0][0]
            let tratamento = data[1][0]
            let pacienteMedico = data[2][0]

            console.log(cancropaciente)

            let obj = {
                id: paciente.id,
                nome: paciente.pessoa.nome,
                email: paciente.pessoa.id,
                num_telm: paciente.pessoa.num_telm,
                dnsc: paciente.dnsc,
                tipo: cancropaciente.tipo.diag,
                est: cancropaciente.est,
                morada: tratamento.location.morada,
                hospital: tratamento.location.nome,
                medico: pacienteMedico.medico.pessoa.nome
            }
            console.log(obj)
            res.send(obj)
        })
    }
}