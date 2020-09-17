const express = require('express');
const logger = require('morgan');
const movies = require('./routes/movies') ;
const users = require('./routes/users');
const clients = require('./routes/clients');
const bodyParser = require('body-parser');
const cors=require('cors');

//database configuration
const mongoose = require('./config/database'); 
var jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
// PORT
const PORT = process.env.PORT || 4000;

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});

app.set('secretKey', 'nodeRestApi'); // jwt secret token

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function(req, res){
res.json({"tutorial" : "Build REST API with node.js"});
});
// public route
app.use('/users', users);

// private route
app.use('/movies', validateUser, movies);
app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

app.use('/clients', clients);


function validateUser(req, res, next) {
  jwt.verify(req.headers['token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:"error", message: err.message, data:null});
    }else{
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
}

// handle errors
app.use(function(err, req, res, next) // express doesn't consider not found 404 as an error so we need to handle 404 explicitly
    {
    console.log(err);
    
      if(err.status === 404)
      res.status(404).json({message: "Not found"});
      else 
        res.status(500).json({message: "Something looks wrong :( !!!"});
    });
