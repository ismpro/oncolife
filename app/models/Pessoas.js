var pool = require("../connection");

class Pessoa {

    constructor(obj) {
        if (!obj)
            return
        this.id = obj.id
        this.sexo = obj.sexo
        this.nome = obj.nome
        this.idade = obj.idade
        this.num_telm = obj.num_telm
    }

    async save() {
        console.log('saving')
    }

    static async getOneById(id) {
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                const query = await pool.query(`SELECT pes_id"id", pes_sexo"sexo", pes_nome"nome", pes_idade"idade", pes_num_telm"num_telm" FROM PESSOAS WHERE pes_id = ${id}`);
                return new Pessoa(query[0]);
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
        let pessoas = [];
        try {
            const sql = `SELECT pes_id"id", pes_sexo"sexo", pes_nome"nome", pes_idade"idade", pes_num_telm"num_telm" FROM PESSOAS`;
            const paciente = await pool.query(sql);
            pessoas = paciente.map(element => {
                return new Pessoa(element)
            });
            return pessoas
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
    }
}

module.exports = Pessoa;