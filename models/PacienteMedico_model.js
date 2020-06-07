const pool = require("./connection");
const Paciente = require('./Paciente_model')
const Medico = require('./Medico_model')

class PacienteMedico {

    constructor(obj) {
        if (!obj)
            return
        this.id = obj.id
        this.paciente = obj.paciente
        this.medico = obj.medico
    }

    async create() {
        let info = pool.query(`INSERT INTO pacientemedico (pac_med_pac_id , pac_med_med_id) VALUES('${this.paciente}', '${this.medico}')`);
        return info.insertId
    }

    static async getAllPacByMecId(id) {
        let pacientes = []
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                const query = await pool.query('SELECT pac_med_id"id", pac_med_pac_id"pac_id" FROM pacientemedico WHERE pac_med_med_id =' + id);
                for (const element of query) {
                    let data = await Promise.all([Paciente.getOneById(element.pac_id), Medico.getOneById(id)])
                    let paciente = data[0];
                    let medico = data[1];
                    pacientes.push(new PacienteMedico({
                        id: element.id,
                        paciente: paciente,
                        medico: medico
                    }))
                }
                return pacientes
            } catch (err) {
                console.log(err);
                return err
            }
        } else {
            console.log("Invalid id");
            return "Invalid id"
        }
    }

    static async getAllMedByPacId(id) {
        let pacientes = []
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                const query = await pool.query('SELECT pac_med_id"id", pac_med_med_id"med_id" FROM pacientemedico WHERE pac_med_pac_id =' + id);
                for (const element of query) {
                    let data = await Promise.all([Medico.getOneById(element.med_id), Paciente.getOneById(id)])
                    let paciente = data[1];
                    let medico = data[0];
                    pacientes.push(new PacienteMedico({
                        id: element.id,
                        paciente: paciente,
                        medico: medico
                    }))
                }
                return pacientes
            } catch (err) {
                console.log(err);
                return err
            }
        } else {
            console.log("Invalid id");
            return "Invalid id"
        }
    }

    static async getOneById(id) {
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query('SELECT pac_med_id"id", pac_med_med_id"med_id" FROM pacientemedico WHERE pac_med_id =' + id);
                let data = await Promise.all([Medico.getOneById(query[0].med_id), Paciente.getOneById(query[0].pac_id)])
                let paciente = data[1]
                let medico = data[0]
                let tratamento = new PacienteMedico({
                    id: query[0].id,
                    paciente: paciente,
                    medico: medico
                })
                return tratamento
            } catch (err) {
                console.log(err);
                return err
            }
        } else {
            console.log("Invalid id");
            return "Invalid id"
        }
    }
}

module.exports = PacienteMedico;