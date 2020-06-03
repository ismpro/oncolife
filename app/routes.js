const path = require('path')

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.status(200).sendFile(path.join(global.appRoot, 'public', 'index.html'))
    })

    app.get('/paciente/:id', function (req, res) {
        res.status(200).sendFile(path.join(global.appRoot, 'pages', 'paciente.html'))
    })

    app.post('/api/pacientes', require('./routes/api/pacientes')())

    app.post('/paciente/:id', require('./routes/paciente')())

    app.post('/api/npaciente', require('./routes/api/npaciente')())

    app.post('/api/npaciente/create', require('./routes/api/npaciente-create')())

    app.get('/api/:id')

    app.get('*', function (req, res) {
        res.status(404).send('Page Not Found');
    })
}