const pool = require("./connection");
const Sessao = require('./Sessao_model')
const Paciente = require('./Paciente_model')

class SessaoPaciente {

    constructor(obj) {
        if (!obj)
            return
        this.id = obj.id //ses_pac_id  
        this.frequencia = obj.frequencia //ses_pac_freq
        this.hora = obj.hora //ses_pac_hora
        this.paciente = obj.paciente //ses_pac_pac_id 
        this.sessao = obj.sessao //ses_pac_ses_id 
    }

    async create() {
        let info = await pool.query(`INSERT INTO sessaopaciente ('ses_pac_freq', 'ses_pac_hora', 'ses_pac_pac_id', 'ses_pac_ses_id') VALUES (${this.frequencia}, ${this.hora}, ${this.paciente}, ${this.sessao})`);
        let data = await Promise.all([Sessao.getOneById(this.sessao), Paciente.getOneById(this.paciente)])
        this.sessao = data[0]
        this.paciente = data[1]
        return info.insertId
    }

    static async getOneById(id) {
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT ses_pac_id"id", ses_pac_freq"frequencia", ses_pac_hora"hora", ses_pac_pac_id"pac_id", ses_pac_ses_id"ses_id" FROM sessaopaciente WHERE ses_pac_id = ${id}`);
                let data = await Promise.all([Sessao.getOneById(query[0].ses_id), Paciente.getOneById(query[0].pac_id)])
                let paciente = data[1]
                let sessao = data[0]
                let sessaopaciente = new SessaoPaciente({
                    id: query[0].id,
                    frequencia: query[0].frequencia,
                    hora: query[0].hora,
                    paciente: paciente,
                    sessao: sessao
                })
                return sessaopaciente
            } catch (err) {
                console.log(err);
                return err
            }
        } else {
            console.log("Invalid id");
            return "Invalid id"
        }
    }

    static async getAll() {
        let sessaopacientes = []
        try {
            let query = await pool.query(`SELECT ses_pac_id"id", ses_pac_freq"frequencia", ses_pac_hora"hora", ses_pac_pac_id"pac_id", ses_pac_ses_id"ses_id" FROM sessaopaciente`);
            for (const element of query) {
                let data = await Promise.all([Sessao.getOneById(element.ses_id), Paciente.getOneById(element.pac_id)])
                let paciente = data[1]
                let sessao = data[0]
                sessaopacientes.push(new SessaoPaciente({
                    id: element.id,
                    frequencia: element.frequencia,
                    hora: element.hora,
                    paciente: paciente,
                    sessao: sessao
                }))
            }
            return sessaopacientes
        } catch (err) {
            console.log(err);
            return err
        }
    }
}


module.exports = SessaoPaciente;