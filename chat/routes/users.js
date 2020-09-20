var express = require("express");
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
const Joi = require("joi");
const Mensaje = require("../models/mensajes");

router.get("/", function (req, res, next) {
  Mensaje.findAll().then((result) => {
    res.send(result);
  });
});



router.get("/chat/api/messages/:id", (req, res) => {

  var mensaje = req.body;
  var db = new sqlite3.Database('c:\\sqlite\\db\\reto.db');
  db.get(`SELECT ts, author, message from mensaje where ts=?`, [req.params.id], function (err, row) {

    if (err) res.status(500).send('El servidor no pudo procesar la solicitud');

    res.send(row);

  });

  db.close();

});

router.post("/chat/api/messages", (req, res) => {
  const { error } = validateClient(req.body);
  var mensaje = req.body;
  var db = new sqlite3.Database('c:\\sqlite\\db\\reto.db');

  if (error) {
    return res.status(400).send(error);
  }
  db.run(`INSERT INTO mensaje(message,author,ts) VALUES(?,?,?)`, [mensaje.message, mensaje.author, mensaje.ts], function (err) {

    if (err) res.status(500).send('El servidor no pudo procesar la solicitud');


    res.send("Exitoso");

  });
  db.close();

});

router.put("/chat/api/messages/:id", (req, res) => {
  const { error } = validateClient(req.body);
  var mensaje = req.body;
  var db = new sqlite3.Database('c:\\sqlite\\db\\reto.db');
  db.run(`UPDATE mensaje set message=?, author=?, ts=? where ts=?`, [mensaje.message, mensaje.author, mensaje.ts, req.params.id], function (err, row) {

    if (err) res.status(500).send('El servidor no pudo procesar la solicitud');


    res.send("Exitoso");

  });
  db.close();


});

router.delete("/chat/api/messages/:id", (req, res) => {
  const { error } = validateClient(req.body);
  var mensaje = req.body;
  var db = new sqlite3.Database('c:\\sqlite\\db\\reto.db');
  db.run(`delete from mensaje where ts=?`, [toString(req.params.id)], function (err, row) {

    if (err) res.status(500).send('El servidor no pudo procesar la solicitud');

    res.send("Exitoso");

  });

  db.close();
});

const validateClient = (client) => {
  const schema = Joi.object({
    message: Joi.string().min(5).required(),
    author: Joi.string().required(),
    ts: Joi.string().required(),
  });

  return schema.validate(client);
};

module.exports = router;
