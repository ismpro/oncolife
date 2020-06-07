const pool = require("./connection");

class Medicacao {

    constructor(obj) {
        this.id = obj.id
        this.nome = obj.nome
        this.dos = obj.dos
    }

    static async getOneById(id) {
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT mdc_id"id", mdc_nome"nome", mdc_dos"dos" FROM medicacao WHERE mdc_id = ${id}`);
                query = query[0]
                let tipo = new Medicacao(query)
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
            let query = await pool.query(`SELECT mdc_id"id", mdc_nome"nome", mdc_dos"dos" FROM medicacao`);
            for (const element of query) {
                tipos.push(new Medicacao(element))
            }
            return tipos
        } catch (err) {
            console.log(err);
            return err
        }
    }
}


module.exports = Medicacao;