const pool = require("../connection");
const TipoCancro = require("./TipoCancro")
const Paciente = require('./Paciente')

class CancroPaciente {

    constructor(obj, createDB) {
        if (!obj)
            return
        this.id = obj.id
        this.est = obj.est
        this.tipo = obj.tipo
        this.paciente = obj.paciente
        if (createDB) {
            pool.query(`INSERT INTO tipodecancropaciente (tp_cancro_pac_est, tp_cancro_pac_pac_id, tp_cancro_pac_tp_cancro_id) VALUES('${this.est}', '${this.paciente}', '${this.tipo}') `);
            Promise.all([TipoCancro.getOneById(this.tipo), Paciente.getOneById(this.paciente)]).then(data => {
                this.paciente = data[0]
                this.paciente = data[1]
            })
        }
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
}


module.exports = CancroPaciente;