require("dotenv").config()
const jwt = require("jsonwebtoken");
const auth =(req, res, next) => {
  
      const auth = req.headers["authorization"];
      const token = auth && auth.split(" ")[1];
     console.log(token);
      if (token) {
        const verify = jwt.verify(token, process.env.SECRET_KEY);
      
        if (verify) {
          res.token=verify.id
          next();
        }
      } else {
        res.sendStatus(401);
      }
   
  }
module.exports=auth