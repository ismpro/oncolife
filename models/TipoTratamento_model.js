const pool = require("./connection");

class TipoTratamento {

    constructor(obj) {
        this.id = obj.id
        this.diag = obj.nome
    }

    static async getOneById(id) {
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT tp_trat_Id"id", tp_trat_nome"nome" FROM Tipo_de_Tratamento WHERE tp_trat_Id = ${id}`);
                query = query[0]
                let tipo = new TipoTratamento(query)
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
            let query = await pool.query(`SELECT tp_trat_Id"id", tp_trat_nome"nome" FROM Tipo_de_Tratamento`);
            for (const element of query) {
                tipos.push(new TipoTratamento(element))
            }
            return tipos
        } catch (err) {
            console.log(err);
            return err
        }
    }
}


module.exports = TipoTratamento;