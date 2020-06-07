const SistomasSessaoPaciente = require('../models/SintomasSessaoPaciente_model')
const SessaoPaciente = require('../models/SessaoPaciente_model')

module.exports = function () {
    return async function (req, res) {

        try {
            let data = JSON.parse(Object.keys(req.body));

            console.log(data)

            let sessaoPaciente = new SessaoPaciente({ frequencia: 1, date: data.data, hora: data.time, paciente: data.id, sessao: 1 });
            let sessaoPacienteId = await sessaoPaciente.create()

            let sistomasSessaoPaciente = new SistomasSessaoPaciente({ sessaoPaciente: sessaoPacienteId, sintoma: data.sis.id });
            await sistomasSessaoPaciente.create()

            res.send(true)
        } catch (error) {
            res.send(error)
        }
    }
}