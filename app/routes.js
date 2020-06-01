const path = require('path')

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.status(200).sendFile(path.join(global.appRoot, 'public', 'index.html'))
    })

    app.post('/api/pacientes', require('./routes/api/pacientes')())

    app.post('/api/npaciente', require('./routes/api/npaciente')())

    app.post('/api/npaciente/create', require('./routes/api/npaciente-create')())

    app.get('/api/:id')

    app.get('*', function (req, res) {
        res.status(404).send('Page Not Found');
    })
}