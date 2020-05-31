const pool = require("../connection");

class CancroPaciente {

    constructor(obj) {
        if (!obj)
            return
        this.id = obj.id
        this.est = obj.est
        this.tipo = obj.tipo
    }

    async save() {
        console.log('saving')

    }

    static async getAllByPacId(id) {
        let tratamentos = []
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT tp_cancro_pac_id"id", tp_cancro_pac_est"est", tp_cancro_pac_tp_cancro_id"tp_id" FROM Tipodecancropaciente WHERE tp_cancro_pac_pac_id = ${id}`);

                for (const element of query) {
                    let tipoCancro = await pool.query(`SELECT tp_cancro_id"id", tp_cancro_diag"diag" FROM Tipo_de_cancro WHERE tp_cancro_id = ${element.tp_id}`);

                    tratamentos.push(new CancroPaciente({
                        ...element, tipo: {
                            id: tipoCancro[0].id,
                            diag: tipoCancro[0].diag
                        }
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

    /* static async getOneById(id) {
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query('SELECT pac_id"id", pac_dnsc"dnsc", pac_peso"peso", pac_altura"altura", pac_pes_id"pes_id" FROM PACIENTE WHERE pac_id = 1');
                query = query[0]
                let pessoa = await Pessoa.getOneById(query.pes_id);
                let paciente = new Paciente({ pessoa: pessoa, ...query })
                return paciente
            } catch (err) {
                console.log(err);
                return { status: 500, data: err }
            }
        } else {
            console.log("Invalid id");
            return "Invalid id"
        }
    }

    static async getAll() {
        let pacientes = []
        try {
            const query = await pool.query(`SELECT pac_id"id", pac_dnsc"dnsc", pac_peso"peso", pac_altura"altura", pac_pes_id"pes_id" FROM PACIENTE`);
            for (const element of query) {
                let pessoa = await Pessoa.getOneById(element.pes_id);
                pacientes.push(new Paciente({ ...element, pessoa: pessoa }))
            }
            return pacientes
        } catch (err) {
            console.log(err);
            return { status: 500, data: err }
        }
    }

    static async updateOneById() {
        try {
            const sql = "SELECT * FROM PACIENTE";
            const paciente = await pool.query(sql);
            return { status: 200, data: paciente };
        } catch (err) {
            console.log(err);
            return { status: 500, data: err }
        }
    }

    static async deleteOneById() {
        try {
            const sql = "SELECT * FROM PACIENTE";
            const paciente = await pool.query(sql);
            return { status: 200, data: paciente };
        } catch (err) {
            console.log(err);
            return { status: 500, data: err }
        }
    } */
}


module.exports = CancroPaciente;