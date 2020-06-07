const pool = require("./connection");

class TipoCancro {

    constructor(obj) {
        this.id = obj.id
        this.diag = obj.diag
    }

    static async getOneById(id) {
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT tp_cancro_id"id", tp_cancro_diag"diag" FROM tipo_de_cancro WHERE tp_cancro_id = ${id}`);
                query = query[0]
                let tipo = new TipoCancro(query)
                return tipo
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
        let tipos = []
        try {
            let query = await pool.query(`SELECT tp_cancro_id"id", tp_cancro_diag"diag" FROM tipo_de_cancro`);
            for (const element of query) {
                tipos.push(new TipoCancro(element))
            }
            return tipos
        } catch (err) {
            console.log(err);
            return err
        }
    }
}


module.exports = TipoCancro;