const pool = require("../connection");
const TipoCancro = require('./TipoCancro_model')
const Paciente = require('./Paciente_model')

class TipoCancroPaciente {

    constructor(obj) {
        if (!obj)
            return
        this.id = obj.id //tp_cancro_pac_id 
        this.est = obj.est //tp_cancro_pac_est
        this.paciente = obj.paciente //tp_cancro_pac_pac_id 
        this.tipo = obj.tipo //tp_cancro_pac_tp_cancro_id 
    }

    async create() {
        let info = pool.query(`INSERT INTO tipodecancropaciente (tp_cancro_pac_est, tp_cancro_pac_pac_id , tp_cancro_pac_tp_cancro_id ) VALUES('${this.est}', '${this.paciente}', '${this.tipo}')`);
        let data = await Promise.all([TipoCancro.getOneById(this.tipo), Paciente.getOneById(this.paciente)])
        this.tipo = data[0]
        this.paciente = data[1]
        return info.insertId
    }

    static async getOneById(id) {
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT tp_cancro_pac_id"id", tp_cancro_pac_est"est", tp_cancro_pac_pac_id"pac_id", tp_cancro_pac_tp_cancro_id"tp_cancro_id" FROM tipodecancropaciente WHERE tp_cancro_id = ${id}`);
                let data = await Promise.all([TipoCancro.getOneById(query[0].tp_cancro_id), Paciente.getOneById(query[0].pac_id)])
                let tipo = data[0]
                let paciente = data[1]
                query = query[0]
                let tipo = new TipoCancroPaciente({
                    id: query[0].id,
                    est: query[0].est,
                    paciente: paciente,
                    tipo: tipo
                })
                return tipo
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
        let tipos = []
        try {
            let query = await pool.query(`SELECT tp_cancro_pac_id"id", tp_cancro_pac_est"est", tp_cancro_pac_pac_id"pac_id", tp_cancro_pac_tp_cancro_id"tp_cancro_id" FROM tipodecancropaciente`);
            for (const element of query) {
                let data = await Promise.all([TipoCancro.getOneById(element.tp_cancro_id), Paciente.getOneById(element.pac_id)])
                let tipo = data[0]
                let paciente = data[1]
                tipos.push(new TipoCancroPaciente({
                    id: element.id,
                    est: element.est,
                    paciente: paciente,
                    tipo: tipo
                }))
            }
            return tipos
        } catch (err) {
            console.log(err);
            return err
        }
    }
}


module.exports = TipoCancroPaciente;