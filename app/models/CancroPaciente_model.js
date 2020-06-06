const pool = require("../connection");
const TipoCancro = require("./TipoCancro_model")
const Paciente = require('./Paciente_model')

class CancroPaciente {

    constructor(obj) {
        if (!obj)
            return
        this.id = obj.id
        this.est = obj.est
        this.tipo = obj.tipo
        this.paciente = obj.paciente
    }

    async create() {
        let info = await pool.query(`INSERT INTO tipodecancropaciente (tp_cancro_pac_est, tp_cancro_pac_pac_id, tp_cancro_pac_tp_cancro_id) VALUES('${this.est}', '${this.paciente}', '${this.tipo}') `);
        let data = await Promise.all([TipoCancro.getOneById(this.tipo), Paciente.getOneById(this.paciente)])
        this.tipo = data[0]
        this.paciente = data[1]
        return info.insertId
    }

    static async getAllByPacId(id) {
        let tratamentos = []
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT tp_cancro_pac_id"id", tp_cancro_pac_est"est", tp_cancro_pac_tp_cancro_id"tp_id" FROM Tipodecancropaciente WHERE tp_cancro_pac_pac_id = ${id}`);
                for (const element of query) {
                    let data = await Promise.all([TipoCancro.getOneById(element.tp_id), Paciente.getOneById(id)])
                    let tipoCancro = data[0];
                    let paciente = data[1];
                    tratamentos.push(new CancroPaciente({
                        id: element.id,
                        est: element.est,
                        tipo: tipoCancro,
                        paciente: paciente
                    }))
                }
                return tratamentos
            } catch (err) {
                console.log(err);
                return { status: 500, data: err }
            }
        } else {
            console.log("Invalid id");
            return "Invalid id"
        }
    }

    static async getOneById(id) {
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT tp_cancro_pac_id"id", tp_cancro_pac_est"est", tp_cancro_pac_tp_cancro_id"tp_id" FROM Tipodecancropaciente WHERE tp_cancro_pac_id = ${id}`);
                let data = await Promise.all([TipoCancro.getOneById(query[0].tp_id), Paciente.getOneById(id)])
                let tipoCancro = data[0];
                let paciente = data[1];
                let cancropaciente = new CancroPaciente({
                    id: query[0].id,
                    est: query[0].est,
                    tipo: tipoCancro,
                    paciente: paciente
                })
                return cancropaciente
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
        let tratamentos = []
        try {
            let query = await pool.query(`SELECT tp_cancro_pac_id"id", tp_cancro_pac_est"est", tp_cancro_pac_tp_cancro_id"tp_id", tp_cancro_pac_pac_id"pac_id" FROM Tipodecancropaciente`);
            for (const element of query) {
                let data = await Promise.all([TipoCancro.getOneById(element.tp_id), Paciente.getOneById(element.pac_id)])
                let tipoCancro = data[0];
                let paciente = data[1];
                tratamentos.push(new CancroPaciente({
                    id: element.id,
                    est: element.est,
                    tipo: tipoCancro,
                    paciente: paciente
                }))
            }
            return tratamentos
        } catch (err) {
            console.log(err);
            return err
        }
    }
}


module.exports = CancroPaciente;