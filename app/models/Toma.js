const pool = require("../connection");
const Medicacao = require('./Medicacao')

class Toma {

    constructor(obj) {
        if (!obj)
            return
        this.id = obj.id
        this.nome_mdc = obj.nome_mdc
        this.hora = obj.hora
        this.hora_adm = obj.hora_adm
        this.mdc = obj.mdc
        this.paciente = obj.paciente
    }

    async create() {
        try {
            let info = await pool.query(`INSERT INTO Toma (tom_nome_mdc, tom_hora, tom_hora_adm, tom_mdc_id, tom_pac_id) VALUES('${this.nome_mdc}', '${this.hora}', '${this.hora_adm}', '${this.mdc}', '${this.paciente}')`);
            return info.insertId
        } catch (error) {
            console.log(error)
        }
    }

    static async getAllByPacId(id) {
        let tomas = []
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT tom_id"id", tom_nome_mdc"nome_mdc", tom_hora"hora", tom_hora_adm"hora_adm", tom_mdc_id"mdc_id" FROM Toma WHERE tom_pac_id = ${id}`);
                for (const element of query) {
                    let med = await Medicacao.getOneById(element.mdc_id)
                    tomas.push(new Toma({
                        id: element.id,
                        nome_mdc: element.nome_mdc,
                        hora: element.hora,
                        hora_adm: element.hora_adm,
                        mdc_id: 5,
                        mdc: med
                    }))
                }
                return tomas
            } catch (err) {
                console.log(err);
                return { status: 500, data: err }
            }
        } else {
            console.log("Invalid id");
            return "Invalid id"
        }
    }
}

module.exports = Toma;