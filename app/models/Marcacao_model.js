const pool = require("../connection");

class Marcacao {

    constructor(obj) {
        if (!obj)
            return
        this.id = obj.id //mar_id 
        this.data = obj.data //mar_data
        this.hora = obj.hora //mar_hora
    }

    async create() {
        let info = await pool.query(`INSERT INTO marcacao ('mar_data', 'mar_hora') VALUES (${this.data}, ${this.hora})`);
        return info.insertId
    }

    static async getOneById(id) {
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT mar_id"id", mar_data"data", mar_hora"hora" FROM marcacao WHERE mar_id = ${id}`);
                let marcacao = new Marcacao({
                    id: query[0].id,
                    data: new Date(query[0].data),
                    hora: query[0].hora,
                })
                return marcacao
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
        let cuidadores = []
        try {
            let query = await pool.query(`SELECT mar_id"id", mar_data"data", mar_hora"hora" FROM marcacao`);
            for (const element of query) {
                cuidadores.push(new Marcacao({
                    id: element.id,
                    data: new Date(element.data),
                    hora: element.hora,
                }))
            }
            return cuidadores
        } catch (err) {
            console.log(err);
            return err
        }
    }
}


module.exports = Marcacao;