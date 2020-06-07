const SessaoPaciente = require('../models/SessaoPaciente_model')
const SintomasSessaoPaciente = require('../models/SintomasSessaoPaciente_model')

module.exports = function () {
    return async function (req, res) {
        SessaoPaciente.getAllByPacId(req.params.id).then(async function (sessaoPacientes) {
            console.log(sessaoPacientes)
            let alldata = []
            for (const sessaoPaciente of sessaoPacientes) {
                let sistomas = await SintomasSessaoPaciente.getAllBySesPacId(sessaoPaciente.id)
                alldata.push({
                    id: sessaoPaciente.id,
                    data: sessaoPaciente.date,
                    hora: sessaoPaciente.hora,
                    sistomas: sistomas.map(sis=>sis.sintoma.nome),
                })
            }
            res.send(alldata)
        })

    }
}