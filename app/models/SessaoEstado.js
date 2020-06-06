const pool = require("../connection");
const Sessao = require('./Sessao_model')
const Estado = require('./Estado_model')

class SessaoEstado {

    constructor(obj) {
        if (!obj)
            return
        this.id = obj.id //ses_est_id  
        this.sessao = obj.sessao //ses_est_ses_id   
        this.estado = obj.estado //ses_est_est_id   
    }

    async create() {
        let info = await pool.query(`INSERT INTO sessaoestado (ses_est_ses_id, ses_est_est_id) VALUES('${this.sessao}', '${this.estado}')`);
        let data = await Promise.all([Sessao.getOneById(this.sessao), Estado.getOneById(this.estado)])
        this.sessao = data[0];
        this.estado = data[1];
        return info.insertId
    }

    static async getOneById(id) {
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT ses_est_id"id", ses_est_ses_id"ses_id", ses_est_est_id"est_id" FROM sessaoestado WHERE ses_est_id = ${id}`);
                let data = await Promise.all([Sessao.getOneById(query[0].ses_id), Estado.getOneById(query[0].est_id)])
                let sessao = data[0];
                let estado = data[1];
                let obj = new SessaoEstado({
                    id: query[0].id,
                    sessao: sessao,
                    estado: estado,
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
            let query = await pool.query(`SELECT ses_est_id"id", ses_est_ses_id"ses_id", ses_est_est_id"est_id" FROM sessaoestado`);
            for (const element of query) {
                let data = await Promise.all([Sessao.getOneById(element.ses_id), Estado.getOneById(element.est_id)])
                let sessao = data[0];
                let estado = data[1];
                array.push(new SessaoEstado({
                    id: element.id,
                    sessao: sessao,
                    estado: estado,
                }))
            }
            return array
        } catch (err) {
            console.log(err);
            return err
        }
    }

    static async getAllSesByEstId(id) {
        let array = []
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT ses_est_id"id", ses_est_ses_id"ses_id", ses_est_est_id"est_id" FROM sessaoestado WHERE ses_est_est_id = ${id}`);
                for (const element of query) {
                    let data = await Promise.all([Sessao.getOneById(element.ses_id), Estado.getOneById(element.est_id)])
                    let sessao = data[0];
                    let estado = data[1];
                    array.push(new SessaoEstado({
                        id: element.id,
                        sessao: sessao,
                        estado: estado,
                    }))
                }
                return array
            } catch (err) {
                console.log(err);
                return err
            }
        }
    }

    static async getAllEstBySesId(id) {
        let array = []
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT ses_est_id"id", ses_est_ses_id"ses_id", ses_est_est_id"est_id" FROM sessaoestado WHERE ses_est_ses_id = ${id}`);
                for (const element of query) {
                    let data = await Promise.all([Sessao.getOneById(element.ses_id), Estado.getOneById(element.est_id)])
                    let sessao = data[0];
                    let estado = data[1];
                    array.push(new SessaoEstado({
                        id: element.id,
                        sessao: sessao,
                        estado: estado,
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

module.exports = SessaoEstado;