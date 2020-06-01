const pool = require("../connection");

class PacienteMedico {

    constructor(obj) {
        if (!obj)
            return
        this.id = obj.id
        this.paciente = obj.paciente
        this.medico = obj.medico || 5
    }

    async create() {
        let info = pool.query(`INSERT INTO pacientemedico (pac_med_pac_id , pac_med_med_id) VALUES('${this.paciente}', '${this.medico}')`);
        return info.insertId
    }
}


module.exports = PacienteMedico;