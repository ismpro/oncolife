const pool = require("./connection");
const Pessoa = require("./Pessoas_model")

class Medico {

    constructor(obj) {
        if (!obj)
            return
        this.id = obj.id //med_id
        this.licen = obj.licen //med_licen
        this.espec = obj.espec //med_espec
        this.pessoa = obj.pessoa //med_pes_id
    }

    async create() {
        let info = await pool.query(`INSERT INTO 'Medico' ('med_licen', 'med_espec', 'med_pes_id') VALUES (${this.licen}, ${this.espec}, ${this.pessoa})`);
        let data = await Pessoa.getOneById(this.pessoa);
        this.pessoa = data
        return info.insertId
    }

    static async getOneById(id) {
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT med_id"id", med_licen"licen", med_espec"espec", med_pes_id"pes_id" FROM medico WHERE med_id = ${id}`);
                let pessoa = await Pessoa.getOneById(query[0].pes_id);
                let medico = new Medico({
                    id: query[0].id,
                    licen: query[0].licen,
                    espec: query[0].espec,
                    pessoa: pessoa
                })
                return medico
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
        let medicos = []
        try {
            let query = await pool.query(`SELECT med_id"id", med_licen"licen", med_espec"espec", med_pes_id"pes_id" FROM medico`);
            for (const element of query) {
                let pessoa = await Pessoa.getOneById(element.pes_id);
                medicos.push(new Medico({
                    id: element.id,
                    licen: element.licen,
                    espec: element.espec,
                    pessoa: pessoa
                }))
            }
            return medicos
        } catch (err) {
            console.log(err);
            return err
        }
    }
}

module.exports = Medico;