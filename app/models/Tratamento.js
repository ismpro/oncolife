const pool = require("../connection");

class Tratamento {

    constructor(obj) {
        if (!obj)
            return
        this.id = obj.id
        this.uti = obj.uti
        this.location = obj.location
        this.medico = obj.medico
        this.tipo = obj.tipo
    }

    async save() {
        console.log('saving')

    }

    static async getAllByPacId(id) {
        let tratamentos = []
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT trat_id"id", trat_uti"uti", trat_tp_trat_id"tp_id", trat_loc_id"loc_id", trat_pac_med_id"med_id" FROM Tratamento WHERE trat_pac_id = ${id}`);

                for (const element of query) {
                    let tipoTratamento = await pool.query(`SELECT tp_trat_Id"id", tp_trat_nome"nome" FROM Tipo_de_Tratamento WHERE tp_trat_Id = ${element.tp_id}`);
                    delete element.tp_id;
                    tratamentos.push(new Tratamento({
                        ...element, tipo: {
                            id: tipoTratamento[0].id,
                            nome: tipoTratamento[0].nome
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


module.exports = Tratamento;