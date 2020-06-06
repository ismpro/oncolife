const pool = require("../connection");

class Sintomas {

    constructor(obj) {
        this.id = obj.id //sint_tip_id 
        this.nome = obj.nome //sint_tip_nome
    }

    static async getOneById(id) {
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT sint_tip_id"id", sint_tip_nome"diag" FROM sintomas WHERE sint_tip_id = ${id}`);
                query = query[0]
                let tipo = new Sintomas(query)
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
            let query = await pool.query(`SELECT sint_tip_id"id", sint_tip_nome"diag" FROM sintomas`);
            for (const element of query) {
                tipos.push(new Sintomas(element))
            }
            return tipos
        } catch (err) {
            console.log(err);
            return err
        }
    }
}


module.exports = Sintomas;