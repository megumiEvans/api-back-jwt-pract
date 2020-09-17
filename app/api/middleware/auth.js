const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.header("token");
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded = jwt.verify(req.headers['token'], req.app.get('secretKey'));
    req.body.userId = decoded.id;

    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};
/*
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
}// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
*/