var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Config
var app = express();
global.appRoot = path.resolve(__dirname);
const sql = require('./app/connection')

//Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const Paciente = require('./app/models/Paciente')

Paciente.getAll().then(data => {
    console.log(data)
});


//Adding Routes
require('./app/routes.js')(app)

module.exports = app;
