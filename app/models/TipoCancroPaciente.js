const pool = require("../connection");

class TipoCancroPaciente {

    constructor(obj) {
        if (!obj)
            return
        this.id = obj.id
        this.est = obj.est || 1
        this.paciente = obj.paciente
        this.tipo = obj.tipo
    }

    async create() {
        let info = pool.query(`INSERT INTO tipodecancropaciente (tp_cancro_pac_est, tp_cancro_pac_pac_id , tp_cancro_pac_tp_cancro_id ) VALUES('${this.est}', '${this.paciente}', '${this.tipo}')`);
        return info.insertId
    }
}


module.exports = TipoCancroPaciente;