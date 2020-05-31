const pool = require("../connection");

class Toma {

    constructor(obj) {
        if (!obj)
            return
        this.id = obj.id
        this.nome_mdc = obj.nome_mdc
        this.hora = obj.hora
        this.hora_adm = obj.hora_adm
        this.mdc = obj.mdc
    }

    async save() {
        console.log('saving')

    }

    static async getAllByPacId(id) {
        let tomas = []
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT tom_id"id", tom_nome_mdc"nome_mdc", tom_hora"hora", tom_hora_adm"hora_adm", tom_mdc_id"mdc_id" FROM Toma WHERE tom_pac_id = ${id}`);
                for (const element of query) {
                    let med = await pool.query(`SELECT mdc_id"id", mdc_nome"nome", mdc_dos"dos" FROM medicacao WHERE mdc_id = ${element.mdc_id}`);
                    tomas.push(new Toma({
                        ...element, mdc: {
                            id: med[0].id,
                            nome: med[0].nome,
                            dos: med[0].dos,
                        }
                    }))
                }
                console.log(tomas)
                return tomas
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


module.exports = Toma;