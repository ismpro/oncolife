const pool = require("../connection");
const Medico = require('./Medico_model')
const Marcacao = require('./Marcacao_model')

class PacienteMedicoMarcacao {

    constructor(obj) {
        if (!obj)
            return
        this.id = obj.id //pac_med_mar_id 
        this.medico = obj.medico //pac_med_mar_pac_med_id  
        this.marcacao = obj.marcacao //pac_med_mar_mar_id  
    }

    async create() {
        let info = await pool.query(`INSERT INTO pacientemedicomarcacao (pac_med_mar_pac_med_id, pac_med_mar_mar_id) VALUES('${this.medico}', '${this.marcacao}')`);
        let data = await Promise.all([Medico.getOneById(this.medico), Marcacao.getOneById(this.marcacao)])
        this.medico = data[0];
        this.marcacao = data[1];
        return info.insertId
    }

    static async getOneById(id) {
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT pac_med_mar_id"id", pac_med_mar_pac_med_id"med_id", pac_med_mar_mar_id"mar_id" FROM pacientemedicomarcacao WHERE pac_med_mar_id = ${id}`);
                let data = await Promise.all([Medico.getOneById(query[0].med_id), Marcacao.getOneById(query[0].mar_id)])
                let medico = data[0];
                let marcacao = data[1];
                let obj = new PacienteMedicoMarcacao({
                    id: query[0].id,
                    medico: medico,
                    marcacao: marcacao,
                })
                return obj
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
        let array = []
        try {
            let query = await pool.query(`SELECT pac_med_mar_id"id", pac_med_mar_pac_med_id"med_id", pac_med_mar_mar_id"mar_id" FROM pacientemedicomarcacao`);
            for (const element of query) {
                let data = await Promise.all([Medico.getOneById(element.med_id), Marcacao.getOneById(element.mar_id)])
                let medico = data[0];
                let marcacao = data[1];
                array.push(new PacienteMedicoMarcacao({
                    id: query[0].id,
                    medico: medico,
                    marcacao: marcacao,
                }))
            }
            return array
        } catch (err) {
            console.log(err);
            return err
        }
    }

    static async getAllMarByMedId(id) {
        let array = []
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT pac_med_mar_id"id", pac_med_mar_pac_med_id"med_id", pac_med_mar_mar_id"mar_id" FROM pacientemedicomarcacao WHERE pac_med_mar_pac_med_id = ${id}`);
                for (const element of query) {
                    let data = await Promise.all([Medico.getOneById(element.med_id), Marcacao.getOneById(element.mar_id)])
                    let medico = data[0];
                    let marcacao = data[1];
                    array.push(new PacienteMedicoMarcacao({
                        id: query[0].id,
                        medico: medico,
                        marcacao: marcacao,
                    }))
                }
                return array
            } catch (err) {
                console.log(err);
                return err
            }
        }
    }

    static async getAllMedByMarId(id) {
        let array = []
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT pac_med_mar_id"id", pac_med_mar_pac_med_id"med_id", pac_med_mar_mar_id"mar_id" FROM pacientemedicomarcacao WHERE pac_med_mar_mar_id = ${id}`);
                for (const element of query) {
                    let data = await Promise.all([Medico.getOneById(element.med_id), Marcacao.getOneById(element.mar_id)])
                    let medico = data[0];
                    let marcacao = data[1];
                    array.push(new PacienteMedicoMarcacao({
                        id: query[0].id,
                        medico: medico,
                        marcacao: marcacao,
                    }))
                }
                return array
            } catch (err) {
                console.log(err);
                return err
            }
        }
    }
}

module.exports = PacienteMedicoMarcacao;