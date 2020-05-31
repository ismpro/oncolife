const path = require('path')


module.exports = function (app) {

    app.get('/', function (req, res) {
        res.status(200).sendFile(path.join(global.appRoot, 'public', 'index.html'))
    })

    app.post('/api/pacientes', require('./routes/api/pacientes')())

    app.get('*', function (req, res) {
        res.status(404).send('Page Not Found');
    })
}