const jwt = require("jsonwebtoken")
const config=require("../config/dbsecret")

verifyToken = (req, res, next) => {
    // let token = req.header('Authorization').replace('Bearer ', '');
    let token=req.cookies.token
    if (!token) {
      res.redirect('http://localhost:3000/login')
      return;
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.useremail = decoded.email;
      next();
    });
  };

  
module.exports={verifyToken}