const pool = require("../connection");
const Paciente = require('./Paciente_model')
const Cuidador = require('./Cuidador_model')

class PacienteCuidador {

    constructor(obj) {
        if (!obj)
            return
        this.id = obj.id //pac_cui_id  
        this.paciente = obj.paciente //pac_cui_pac_id 
        this.cuidador = obj.data_fim //pac_cui_cui_id 
    }

    async create() {
        let info = await pool.query(`INSERT INTO pacientecuidador ('pac_cui_pac_id', 'pac_cui_cui_id') VALUES (${this.paciente}, ${this.cuidador})`);
        let data = await Promise.all([Paciente.getOneById(this.paciente), Cuidador.getOneById(this.cuidador)])
        this.cuidador = data[1]
        this.paciente = data[0]
        return info.insertId
    }

    static async getOneById(id) {
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT pac_cui_id"id", pac_cui_pac_id"pac_id", pac_cui_cui_id"cui_id" FROM pacientecuidador WHERE pac_cui_id = ${id}`);
                let data = await Promise.all([Paciente.getOneById(query[0].pac_id), Cuidador.getOneById(query[0].cui_id)])
                let cuidador = data[1]
                let paciente = data[0]
                let pacienteCuidador = new PacienteCuidador({
                    id: query[0].id,
                    cuidador: cuidador,
                    paciente: paciente
                })
                return pacienteCuidador
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
        let pacienteCuidadores = []
        try {
            let query = await pool.query(`SELECT pac_cui_id"id", pac_cui_pac_id"pac_id", pac_cui_cui_id"cui_id" FROM pacientecuidador`);
            for (const element of query) {
                let data = await Promise.all([Paciente.getOneById(element.pac_id), Cuidador.getOneById(element.cui_id)])
                let cuidador = data[1]
                let paciente = data[0]
                pacienteCuidadores.push(new PacienteCuidador({
                    id: element.id,
                    cuidador: cuidador,
                    paciente: paciente
                }))
            }
            return pacienteCuidadores
        } catch (err) {
            console.log(err);
            return err
        }
    }

    static async getAllPacByCuiId(id) {
        let pacientes = []
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                const query = await pool.query('SELECT pac_cui_id"id", pac_cui_pac_id"pac_id", pac_cui_cui_id"cui_id" FROM pacientecuidador WHERE pac_cui_cui_id =' + id);
                for (const element of query) {
                    let data = await Promise.all([Paciente.getOneById(element.pac_id), Cuidador.getOneById(element.cui_id)])
                    let cuidador = data[1]
                    let paciente = data[0]
                    pacientes.push(new PacienteCuidador({
                        id: element.id,
                        cuidador: cuidador,
                        paciente: paciente
                    }))
                }
                return pacientes
            } catch (err) {
                console.log(err);
                return err
            }
        } else {
            console.log("Invalid id");
            return "Invalid id"
        }
    }

    static async getAllCuiByPacId(id) {
        let cuidadores = []
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                const query = await pool.query('SELECT pac_cui_id"id", pac_cui_pac_id"pac_id", pac_cui_cui_id"cui_id" FROM pacientecuidador WHERE pac_cui_pac_id =' + id);
                for (const element of query) {
                    let data = await Promise.all([Paciente.getOneById(element.pac_id), Cuidador.getOneById(element.cui_id)])
                    let cuidador = data[1]
                    let paciente = data[0]
                    cuidadores.push(new PacienteCuidador({
                        id: element.id,
                        cuidador: cuidador,
                        paciente: paciente
                    }))
                }
                return cuidadores
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

module.exports = PacienteCuidador;