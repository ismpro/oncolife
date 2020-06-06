const pool = require("../connection");
const Medicacao = require('./Medicacao_model')
const Paciente = require('./Paciente_model')

class Toma {

    constructor(obj) {
        if (!obj)
            return
        this.id = obj.id
        this.nome_mdc = obj.nome_mdc
        this.hora = obj.hora
        this.hora_adm = obj.hora_adm
        this.medicamento = obj.medicamento
        this.paciente = obj.paciente
    }

    async create() {
        let info = await pool.query(`INSERT INTO Toma (tom_nome_mdc, tom_hora, tom_hora_adm, tom_mdc_id, tom_pac_id) VALUES('${this.nome_mdc}', '${this.hora}', '${this.hora_adm}', '${this.medicamento}', '${this.paciente}')`);
        let data = await Promise.all([Paciente.getOneById(this.paciente), Medicacao.getOneById(this.medicamento)])
        this.medicamento = data[1];
        this.paciente = data[0];
        return info.insertId
    }

    static async getAllByPacId(id) {
        let tomas = []
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT tom_id"id", tom_nome_mdc"nome_mdc", tom_hora"hora", tom_hora_adm"hora_adm", tom_mdc_id"mdc_id", tom_pac_id"pac_id" FROM Toma WHERE tom_pac_id = ${id}`);
                for (const element of query) {
                    let data = await Promise.all([Paciente.getOneById(element.pac_id), Medicacao.getOneById(element.mdc_id)])
                    let medicamento = data[1];
                    let paciente = data[0];
                    tomas.push(new Toma({
                        id: element.id,
                        nome_mdc: element.nome_mdc,
                        hora: element.hora,
                        hora_adm: element.hora_adm,
                        paciente: paciente,
                        medicamento: medicamento
                    }))
                }
                return tomas
            } catch (err) {
                console.log(err);
                return err
            }
        } else {
            console.log("Invalid id");
            return "Invalid id"
        }
    }

    static async getOneById(id) {
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT tom_id"id", tom_nome_mdc"nome_mdc", tom_hora"hora", tom_hora_adm"hora_adm", tom_mdc_id"mdc_id", tom_pac_id"pac_id" FROM Toma WHERE tom_pac_id = ${id}`);
                let data = await Promise.all([Paciente.getOneById(query[0].pac_id), Medicacao.getOneById(query[0].mdc_id)])
                let medicamento = data[1];
                let paciente = data[0];
                let toma = new Toma({
                    id: query[0].id,
                    nome_mdc: query[0].nome_mdc,
                    hora: query[0].hora,
                    hora_adm: query[0].hora_adm,
                    paciente: paciente,
                    medicamento: medicamento
                })
                return toma
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
        let tomas = []
        try {
            let query = await pool.query(`SELECT tom_id"id", tom_nome_mdc"nome_mdc", tom_hora"hora", tom_hora_adm"hora_adm", tom_mdc_id"mdc_id", tom_pac_id"pac_id" FROM Toma`);
            for (const element of query) {
                let data = await Promise.all([Paciente.getOneById(element.pac_id), Medicacao.getOneById(element.mdc_id)])
                let medicamento = data[1];
                let paciente = data[0];
                tomas.push(new Toma({
                    id: element.id,
                    nome_mdc: element.nome_mdc,
                    hora: element.hora,
                    hora_adm: element.hora_adm,
                    paciente: paciente,
                    medicamento: medicamento
                }))
            }
            return tomas
        } catch (err) {
            console.log(err);
            return err
        }
    }
}

module.exports = Toma;