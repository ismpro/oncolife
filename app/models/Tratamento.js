const pool = require("../connection");
const TipoTratamento = require('./TipoTratamento')
const Local = require('./Local')

class Tratamento {

    constructor(obj) {
        if (!obj)
            return
        this.id = obj.id
        this.uti = obj.uti
        this.location = obj.location || 1
        this.paciente = obj.paciente
        this.medico = obj.medico || 5
        this.tipo = obj.tipo
        
    }

    async create() {
        let info = pool.query(`INSERT INTO tratamento (trat_uti, trat_pac_id, trat_tp_trat_id, trat_loc_id, trat_pac_med_id) VALUES('${this.uti}', '${this.paciente}', '${this.tipo}','${this.location}','${this.medico}')`);
        return info.insertId
    }

    static async getAllByPacId(id) {
        let tratamentos = []
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT trat_id"id", trat_uti"uti", trat_tp_trat_id"tp_id", trat_loc_id"loc_id", trat_pac_med_id"med_id" FROM Tratamento WHERE trat_pac_id = ${id}`);

                for (const element of query) {
                    let tipoTratamento = await TipoTratamento.getOneById(element.tp_id)
                    let local = await Local.getOneById(element.loc_id)
                    tratamentos.push(new Tratamento({
                        ...element, tipo: tipoTratamento, local: local
                    }))
                }
                return tratamentos
            } catch (err) {
                return err
            }
        } else {
            console.log("Invalid id");
            return "Invalid id"
        }
    }
}


module.exports = Tratamento;