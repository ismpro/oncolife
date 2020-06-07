const pool = require("./connection");
const SessaoPaciente = require('../models/SessaoPaciente_model')
const Sintomas = require('./Sintomas_model')

class SintomasSessaoPaciente {

    constructor(obj) {
        if (!obj)
            return
        this.id = obj.id //sint_ses_pac_id   
        this.sessaoPaciente = obj.sessaoPaciente //sint_ses_pac_ses_pac_id    
        this.sintoma = obj.sintoma //sint_ses_pac_sint_tip_id    
    }

    async create() {
        let info = await pool.query(`INSERT INTO sintomas_sessao_paciente (sint_ses_pac_ses_pac_id, sint_ses_pac_sint_tip_id) VALUES('${this.sessaoPaciente}', '${this.sintoma}')`);
        let data = await Promise.all([SessaoPaciente.getOneById(this.sessaoPaciente), Sintomas.getOneById(this.sintoma)])
        this.sessaoPaciente = data[0];
        this.sintoma = data[1];
        return info.insertId
    }

    static async getOneById(id) {
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT sint_ses_pac_id"id", sint_ses_pac_ses_pac_id"pac_id", sint_ses_pac_sint_tip_id"sint_tip_id" FROM sintomas_sessao_paciente WHERE sint_ses_pac_id = ${id}`);
                let data = await Promise.all([SessaoPaciente.getOneById(query[0].pac_id), Sintomas.getOneById(query[0].sint_tip_id)])
                let sessaoPaciente = data[0];
                let sintoma = data[1];
                let obj = new SintomasSessaoPaciente({
                    id: query[0].id,
                    sessaoPaciente: sessaoPaciente,
                    sintoma: sintoma,
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
            let query = await pool.query(`SELECT sint_ses_pac_id"id", sint_ses_pac_ses_pac_id"pac_id", sint_ses_pac_sint_tip_id"sint_tip_id" FROM sintomas_sessao_paciente`);
            for (const element of query) {
                let data = await Promise.all([SessaoPaciente.getOneById(element.pac_id), Sintomas.getOneById(element.sint_tip_id)])
                let sessaoPaciente = data[0];
                let sintoma = data[1];
                array.push(new SintomasSessaoPaciente({
                    id: element.id,
                    sessaoPaciente: sessaoPaciente,
                    sintoma: sintoma,
                }))
            }
            return array
        } catch (err) {
            console.log(err);
            return err
        }
    }

    static async getAllBySesPacId(id) {
        let array = []
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT sint_ses_pac_id"id", sint_ses_pac_ses_pac_id"pac_id", sint_ses_pac_sint_tip_id"sint_tip_id" FROM sintomas_sessao_paciente WHERE sint_ses_pac_ses_pac_id = ${id}`);
                for (const element of query) {
                    let data = await Promise.all([SessaoPaciente.getOneById(element.pac_id), Sintomas.getOneById(element.sint_tip_id)])
                    let sessaoPaciente = data[0];
                    let sintoma = data[1];
                    array.push(new SintomasSessaoPaciente({
                        id: element.id,
                        sessaoPaciente: sessaoPaciente,
                        sintoma: sintoma,
                    }))
                }
                return array
            } catch (err) {
                console.log(err);
                return err
            }
        }
    }

    static async getAllBySintId(id) {
        let array = []
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT sint_ses_pac_id"id", sint_ses_pac_ses_pac_id"pac_id", sint_ses_pac_sint_tip_id"sint_tip_id" FROM sintomas_sessao_paciente sessaoestado WHERE sint_ses_pac_sint_tip_id = ${id}`);
                for (const element of query) {
                    let data = await Promise.all([SessaoPaciente.getOneById(element.pac_id), Sintomas.getOneById(element.sint_tip_id)])
                    let sessaoPaciente = data[0];
                    let sintoma = data[1];
                    array.push(new SintomasSessaoPaciente({
                        id: element.id,
                        sessaoPaciente: sessaoPaciente,
                        sintoma: sintoma,
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

module.exports = SintomasSessaoPaciente;