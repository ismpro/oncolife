const pool = require("../connection");

class Local {

    constructor(obj) {
        if (!obj)
            return
        this.id = obj.id
        this.nome = obj.nome
        this.morada = obj.morada
    }

    static async getOneById(id) {
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT loc_id"id", loc_nome"nome", loc_morada"morada" FROM local WHERE loc_id = ${id}`);
                query = query[0]
                let local = new Local(query)
                return local
            } catch (err) {
                console.log(err);
                return err
            }
        } else {
            console.log("Invalid id");
            return "Invalid id"
        }
    }
}


module.exports = Local;