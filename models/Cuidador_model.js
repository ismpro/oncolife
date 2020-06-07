const pool = require("./connection");
const Pessoa = require("./Pessoas_model")


class Cuidador {

    constructor(obj) {
        if (!obj)
            return
        this.id = obj.id //cui_id
        this.grau = obj.grau //cui_grau_par
        this.pessoa = obj.pessoa //cui_pes_id
    }

    async create() {
        let info = await pool.query(`INSERT INTO 'cuidador' ('cui_grau_par', 'cui_pes_id') VALUES (${this.grau}, ${this.pessoa})`);
        let data = await Pessoa.getOneById(this.pessoa);
        this.pessoa = data
        return info.insertId
    }

    static async getOneById(id) {
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT cui_id"id", cui_grau_par"grau", cui_pes_id"pes_id" FROM cuidador WHERE cui_id = ${id}`);
                let pessoa = await Pessoa.getOneById(query[0].pes_id);
                let cuidador = new Cuidador({
                    id: query[0].id,
                    grau: query[0].grau,
                    pessoa: pessoa
                })
                return cuidador
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
            let query = await pool.query(`SELECT cui_id"id", cui_grau_par"grau", cui_pes_id"pes_id" FROM cuidador`);
            for (const element of query) {
                let pessoa = await Pessoa.getOneById(element.pes_id);
                cuidadores.push(new Cuidador({
                    id: element.id,
                    grau: element.grau,
                    pessoa: pessoa
                }))
            }
            return cuidadores
        } catch (err) {
            console.log(err);
            return err
        }
    }
}


module.exports = Cuidador;