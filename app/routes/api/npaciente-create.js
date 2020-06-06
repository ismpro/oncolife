const Pessoas = require('../../models/Pessoas_model')
const Paciente = require('../../models/Paciente_model')
const Toma = require('../../models/Toma_model')
const Tratamento = require('../../models/Tratamento_model')
const TipoCancroPaciente = require('../../models/TipoCancroPaciente_model')
const PacienteMedico = require('../../models/PacienteMedico_model')

module.exports = function () {
    return async function (req, res) {

        let data = JSON.parse(Object.keys(req.body));

        let pessoa = new Pessoas({ sexo: data.gender, nome: data.nome, idade: 20, num_telm: 962112323 });
        let pessoaId = await pessoa.create();

        let paciente = new Paciente({ peso: 45, altura: 190, pessoa: pessoaId });
        let pacienteId = await paciente.create();

        let toma = new Toma({ nome_mdc: 'Afinator', hora: '11:30:00', hora_adm: '12:00:00', mdc: data.med.id, paciente: pacienteId });
        await toma.create();

        let tratamento = new Tratamento({ uti: data.trat.diag, paciente: pacienteId, tipo: data.trat.id });
        await tratamento.create();

        let tcp = new TipoCancroPaciente({ paciente: pacienteId, tipo: data.pat.id });
        await tcp.create();

        let pm = new PacienteMedico({ paciente: pacienteId });
        await pm.create();

        res.send(true)
    }
}