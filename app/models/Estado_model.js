const pool = require("../connection");

class Estado {

    constructor(obj) {
        if (!obj)
            return
        this.id = obj.id //est_id
        this.nome = obj.nome //est_nome
    }

    async create() {
        let info = await pool.query(`INSERT INTO 'estado' ('est_nome') VALUES (${this.nome})`);
        return info.insertId
    }

    static async getOneById(id) {
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT est_id"id", est_nome"nome" FROM estado WHERE est_id = ${id}`);
                let estado = new Estado({
                    id: query[0].id,
                    nome: query[0].nome
                })
                return estado
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
        let estados = []
        try {
            let query = await pool.query(`SELECT est_id"id", est_nome"nome" FROM estado`);
            for (const element of query) {
                estados.push(new Estado({
                    id: element.id,
                    nome: element.nome
                }))
            }
            return estados
        } catch (err) {
            console.log(err);
            return err
        }
    }
}


module.exports = Estado;