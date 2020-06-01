const pool = require("../connection");
const Pessoa = require("./Pessoas");

class Paciente {

    constructor(obj) {
        if (!obj)
            return
        this.id = obj.id
        this.dnsc = obj.dnsc
        this.peso = obj.peso
        this.altura = obj.altura
        this.pessoa = obj.pessoa
    }

    async create() {
        let info = await pool.query(`INSERT INTO paciente (pac_dnsc, pac_peso, pac_altura, pac_pes_id) VALUES( str_to_date('${this.dnsc}','%Y/%m/%d'), '${this.peso}', '${this.altura}', '${this.pessoa}') `);
        this.pessoa = await Pessoa.getOneById(this.pessoa)
        return info.insertId
    }

    static async getAllByMecId(id) {
        let pacientes = []
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {

                const query = await pool.query(`SELECT pac_med_pac_id"id" FROM pacientemedico WHERE pac_med_med_id = ${id}`);
                for (const element of query) {
                    let query = await pool.query(`SELECT pac_id"id", pac_dnsc"dnsc", pac_peso"peso", pac_altura"altura", pac_pes_id"pes_id" FROM PACIENTE WHERE pac_id = ${element.id}`);
                    let pessoa = await Pessoa.getOneById(query[0].pes_id);
                    pacientes.push(new Paciente({ ...query[0], pessoa: pessoa }))
                }
                return pacientes
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
}


module.exports = Paciente;
