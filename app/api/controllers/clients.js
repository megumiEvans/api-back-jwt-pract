//const userModel = require('../models/users');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
var requestjson = require('request-json');

var urlMlabRaiz = "https://api.mlab.com/api/1/databases/mquezada/collections"
var apiKey="apiKey=GOLqWa850qO8tsdCUdby6eq9eKPInBkt";

var urlClientes = "https://api.mlab.com/api/1/databases/mquezada/collections/Clientes?apiKey=GOLqWa850qO8tsdCUdby6eq9eKPInBkt";
var clienteMLab = requestjson.createClient(urlClientes)

module.exports = {

  getById: function(req, res, next) {
    id = req.params.clientsId
    let url="https://api.mlab.com/api/1/databases/mquezada/collections/Clientes?q={\"cuenta\":"+id+"}&"+apiKey
    //https://api.mlab.com/api/1/databases/mquezada/collections/Clientes?q={"cuenta":96}&apiKey=GOLqWa850qO8tsdCUdby6eq9eKPInBkt
    console.log(req.body);
    clientMLab = requestjson.createClient(url)
    clienteMLab.get(req.params.clientId, function(err, clientInfo){
     if (err) {
      next(err);
     } else {
      res.json({status:"success", message: "Client found!!!", data:{clients: clientInfo}});
     }
    });
   },
 getClients: function(req, res) {
    clienteMLab.get('', function(err, resM, body) {
          if (err) {
            console.log(body)
          } else {
            res.send(body)
          }
        })
    },
 
 addClient: function(req, res) {
      clienteMLab.post('', req.body, function(err, resM, body) {
          res.send(body)
      })
    },

  deleteClient: function(req, res) {
     id = req.params.clientsId
     console.log('id: '+id);
    urlMlab = urlMlabRaiz+"/Clientes/"+id+"?"+apiKey;
    console.log('urlMlab: '+urlMlab);
    var clientMLab = requestjson.createClient(urlMlab);
    clientMLab.delete('', req.body, function(err, resM, body) {
          res.send(body)
      })
  },

  editClient: function(req, res) {
    id = req.params.clientsId
    console.log('id: '+id);
   urlMlab = urlMlabRaiz+"/Clientes/"+id+"?"+apiKey;
   console.log('urlMlab: '+urlMlab);
   var clientMLab = requestjson.createClient(urlMlab);
   console.log("body: ",req.body)
   
   clientMLab.put('', req.body, function(err, resM, body) {
         res.send(body)
     })
 },

}