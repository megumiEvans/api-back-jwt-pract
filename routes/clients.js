const express = require('express');
const router = express.Router();
const clientController = require('../app/api/controllers/clients');

const auth = require("../app/api/middleware/auth");
var requestjson = require('request-json');

var urlClientes = "https://api.mlab.com/api/1/databases/mquezada/collections/Clientes?apiKey=GOLqWa850qO8tsdCUdby6eq9eKPInBkt";
var clienteMLab = requestjson.createClient(urlClientes)
/*
router.get('/movements', auth, function(req, res) {
      clienteMLab.get('', function(err, resM, body) {
        if (err) {
          console.log(body)
        } else {
          res.send(body)
        }
      })
    })

router.post('/movements',  auth, function(req, res) {
      clienteMLab.post('', req.body, function(err, resM, body) {
            res.send(body)
          })
        })
  */  


router.get('/movements', auth, clientController.getClients)
router.post('/movements',  auth, clientController.addClient)
router.delete('/movements/:clientsId',  auth, clientController.deleteClient)
router.put('/movements/:clientsId',  auth, clientController.editClient)
module.exports = router;

