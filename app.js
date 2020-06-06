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
require('./app/routes.js')(app)

const m = require('./app/models/SessaoPaciente_model')

m.getAll(1).then(data => console.log(data));

module.exports = app;
