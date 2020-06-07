const pool = require("./connection");
const Paciente = require('./Paciente')
const Cuidador = require('./Cuidador')

class EstadoHumor {

    constructor(obj) {
        if (!obj)
            return
        this.id = obj.id //est_hum_tip_id
        this.tipo = obj.tipo //est_hum_tip_nome
        this.cuidador = obj.cuidador //est_hum_tip_cui_id
        this.paciente = obj.paciente //est_hum_tip_pac_id
    }

    async create() {
        let info = await pool.query(`INSERT INTO 'estado_de_humor' ('est_hum_tip_nome', 'est_hum_tip_cui_id', 'est_hum_tip_pac_id') VALUES (${this.tipo}, ${this.cuidador}, ${this.paciente})`);
        let data = await Promise.all([Paciente.getOneById(this.paciente), Cuidador.getOneById(this.cuidador)]);
        this.paciente = data[0];
        this.cuidador = data[1];
        return info.insertId;
    }

    static async getOneById(id) {
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT est_hum_tip_id"id", est_hum_tip_nome"tipo", est_hum_tip_cui_id"cui_id", est_hum_tip_pac_id"pac_id" FROM estado_de_humor WHERE est_hum_tip_id = ${id}`);
                let data = await Promise.all([Paciente.getOneById(query[0].pac_id), Cuidador.getOneById(query[0].cui_id)]);
                let estadoHumor = new EstadoHumor({
                    id: query[0].id,
                    tipo: query[0].tipo,
                    cuidador: data[1],
                    paciente: data[0],
                })
                return estadoHumor
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
        let estadoHumor = []
        try {
            let query = await pool.query(`SELECT est_hum_tip_id"id", est_hum_tip_nome"tipo", est_hum_tip_cui_id"cui_id", est_hum_tip_pac_id"pac_id" FROM estado_de_humor`);
            for (const element of query) {
                let data = await Promise.all([Paciente.getOneById(element.pac_id), Cuidador.getOneById(element.cui_id)]);
                estadoHumor.push(new EstadoHumor({
                    id: element.id,
                    tipo: element.tipo,
                    cuidador: data[1],
                    paciente: data[0],
                }))
            }
            return estadoHumor
        } catch (err) {
            console.log(err);
            return err
        }
    }
}

module.exports = EstadoHumor;