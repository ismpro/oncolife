const pool = require("../connection");
const Tratamento = require('./Tratamento_model')

class Sessao {

    constructor(obj) {
        if (!obj)
            return
        this.id = obj.id //ses_id 
        this.data_inicio = obj.data_inicio //ses_dt_ini
        this.data_fim = obj.data_fim //ses_dt_fim
        this.hora = obj.hora //ses_hora
        this.tomaEft = obj.tomaEft //ses_tom_eft
        this.tratamento = obj.tratamento //ses_trat_id 
    }

    async create() {
        let info = await pool.query(`INSERT INTO sessao ('ses_dt_ini', 'ses_dt_fim', 'ses_hora', 'ses_tom_eft', 'ses_trat_id') VALUES (${this.data_inicio}, ${this.data_fim}, ${this.hora}, ${this.tomaEft}, ${this.tratamento})`);
        let data = await Tratamento.getOneById(this.tratamento);
        this.tratamento = data
        return info.insertId
    }

    static async getOneById(id) {
        if (id && !isNaN(id) && Number.isSafeInteger(id)) {
            try {
                let query = await pool.query(`SELECT ses_id"id", ses_dt_ini"data_inicio", ses_dt_fim"data_fim", ses_hora"hora", ses_tom_eft"tomaEft", ses_trat_id"trat_id" FROM sessao WHERE ses_id = ${id}`);
                let tratamento = await Tratamento.getOneById(query[0].trat_id);
                let sessao = new Sessao({
                    id: query[0].id,
                    data_inicio: query[0].data_inicio,
                    data_fim: query[0].data_fim,
                    hora: query[0].hora,
                    tomaEft: query[0].tomaEft,
                    tratamento: tratamento
                })
                return sessao
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
        let sessoes = []
        try {
            let query = await pool.query(`SELECT ses_id"id", ses_dt_ini"data_inicio", ses_dt_fim"data_fim", ses_hora"hora", ses_tom_eft"tomaEft", ses_trat_id"trat_id" FROM sessao`);
            for (const element of query) {
                let tratamento = await Tratamento.getOneById(element.trat_id);
                sessoes.push(new Sessao({
                    id: element.id,
                    data_inicio: element.data_inicio,
                    data_fim: element.data_fim,
                    hora: element.hora,
                    tomaEft: element.tomaEft,
                    tratamento: tratamento
                }))
            }
            return sessoes
        } catch (err) {
            console.log(err);
            return err
        }
    }
}


module.exports = Sessao;