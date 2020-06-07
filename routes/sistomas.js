const Sistomas = require('../models/Sintomas_model')

module.exports = function () {
    return async function (req, res) {
        Sistomas.getAll().then(async function (sistomas) {
            res.send(sistomas)
        })
    }
}