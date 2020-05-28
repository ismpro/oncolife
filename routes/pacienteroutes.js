var express = require('express');
var router = express.Router();
var pacienteModel = require("../models/pacientemodels");



router.get('/', async function(req, res, next) {

  let result = await pacienteModel.getAll();

  res.status(result.status).
     send(result.data);

});


router.get('/:id', async function(req, res, next){
  let paciente_id = req.params.id;
  let result = await pacienteModel.getOne(paciente_id);
  res.status(result.status).
    send(result.data)
  });

  module.exports = router;