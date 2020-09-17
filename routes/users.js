const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');

const auth = require("../app/api/middleware/auth");
var requestjson = require('request-json');
/*
var urlMlabRaiz = "https://api.mlab.com/api/1/databases/mquezada/collections"
var apiKey="apiKey=GOLqWa850qO8tsdCUdby6eq9eKPInBkt";*/

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
        })*/
router.get('/all',userController.getAll);
router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);
router.put("/:userId", auth, userController.updateById);
//router.put('/:userId', userController.updateById);
router.delete('/:userId', auth, userController.deleteById);
//router.delete('/:userId', userController.deleteById);
module.exports = router;