var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Config
var app = express();
global.appRoot = path.resolve(__dirname);

//Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Adding Routes
app.post('/api/pacientes', require('./routes/pacientes')())

app.post('/paciente/:id', require('./routes/paciente')())

app.post('/api/npaciente', require('./routes/npaciente')())

app.post('/api/npaciente/create', require('./routes/npaciente-create')())

app.post('/api/grading/:id', require('./routes/grading')())

app.get('/api/sistomas', require('./routes/sistomas')())

app.get('*', function (req, res) {
    res.status(404).send('Page Not Found');
})

module.exports = app;
