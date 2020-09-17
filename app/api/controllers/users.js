const userModel = require('../models/users');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

module.exports = {
   getAll: function(req, res, next) {
      let usersList = [];
      userModel.find({}, function(err, users){
       if (err){
        next(err);
       } else{
        for (let user of users) {
         usersList.push({id: user._id,
             name: user.name, lastname: user.lastname,
            email: user.email});
        }
        res.json({status:"success", message: "Users list found!!!", data:{users: usersList}});
           
       }});
     },
 create: function(req, res, next) {
   userModel.create({ name: req.body.name, lastname: req.body.lastname, email: req.body.email, password: req.body.password }, function (err, result) {
       if (err) 
        next(err);
       else
        res.json({status: "success", message: "User added successfully", data: null});
       
     });
  },
 
 authenticate: function(req, res, next) {
  userModel.findOne({email:req.body.email}, function(err, userInfo){
      try
      {
         if (err) {
            next(err);
         } else {
            if(bcrypt.compareSync(req.body.password, userInfo.password))
               {
                  //jwt.sign= 1. (payload: string,objetc,buffer,secretOrPrivateKey, options?:)
                  //2. (payload: string,objetc,buffer,secretOrPrivateKey, callback)
                  //3. (payload: string,objetc,buffer,secretOrPrivateKey, options)
                  
                  const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
                  res.json({status:"success", message: "User found", data:{user: userInfo, token:token}});
               }
               else{
                  res.status(404).json({status:"error", message: "Invalid email/password", data:null});
               }
         }
      } catch (e) {
         console.error(e);
         res.status(500).send({ message: "Invalid credentials" });
      }
   });
 },
 updateById: function(req, res, next) {
   userModel.findByIdAndUpdate(req.params.userId,{name: req.body.name, lastname: req.body.lastname, email: req.body.email}, function(err, userInfo){
      if(err)
     next(err);
    else {
      console.log("success on update");
     res.json({status:"success", message: "user info", data:null});
    }
   });
  },
  deleteById: function(req, res, next) {
   userModel.findByIdAndRemove(req.params.userId, function(err){
    if(err)
     next(err);
    else {
     res.json({status:"success", message: "User deleted", data:null});
    }
   });
  }

}