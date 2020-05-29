const path = require('path')
const Paciente = require('./models/Paciente')

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.status(200).sendFile(path.join(global.appRoot, 'public', 'index.html'))
    })

    app.post('/api/paciente', function (req, res) {
        Paciente.getAll().then((pacientes) => {
            res.send(pacientes)
        })
    })

    app.get('*', function (req, res) {
        res.status(404).send('Page Not Found');
    })
}