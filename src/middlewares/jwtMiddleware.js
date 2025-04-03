//////////////////////////////////////////////////////
// REQUIRE DOTENV MODULE
//////////////////////////////////////////////////////
require("dotenv").config();

//////////////////////////////////////////////////////
// REQUIRE JWT MODULE
//////////////////////////////////////////////////////
const jwt = require("jsonwebtoken");

//////////////////////////////////////////////////////
// SET JWT CONFIGURATION
//////////////////////////////////////////////////////
const secretKey = process.env.JWT_SECRET_KEY;
const tokenDuration = process.env.JWT_EXPIRES_IN;
const tokenAlgorithm = process.env.JWT_ALGORITHM;
const adminKey = process.env.JWT_ADMIN_KEY;

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR GENERATING JWT TOKEN
//////////////////////////////////////////////////////
module.exports.generateToken = (req, res, next) => {
    const payload = {
      userId: res.locals.id,
      timestamp: new Date(), 
      isAdmin : false
    };
  
    const options = {
      algorithm: tokenAlgorithm,
      expiresIn: tokenDuration,
    };
  
    const callback = (err, token) => {
      if (err) {
        console.error("Error jwt:", err);
        res.status(500).json(err);
      } else {
        res.locals.token = token;
       next();
      }
    };
  
    const token = jwt.sign(payload, secretKey, options, callback);
  };


// to check if the user input for admin code is the same as the secret admin key 
  module.exports.checkCode = (req, res, next) => {
    const admCode = req.body.special_code

    if (admCode == adminKey) {
      next(); 
    }
    else { 
      res.status(401).json({ message: 'Invalid admin code.'});
    }
  }

  // to generate admin tokens with roles 
  module.exports.generateAdminToken = (req, res, next) => {
    const payload = {
      userId: res.locals.id,
      timestamp: new Date(), 
      isAdmin : true
    };
  
    const options = {
      algorithm: tokenAlgorithm,
      expiresIn: tokenDuration,
    };
  
    const callback = (err, token) => {
      if (err) {
        console.error("Error jwt:", err);
        res.status(500).json(err);
      } else {
        res.locals.token = token;
       next();
      }
    };
  
    const token = jwt.sign(payload, secretKey, options, callback);
  };
//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR SENDING JWT TOKEN
//////////////////////////////////////////////////////
module.exports.sendToken = (req, res, next) => {
 // console.log(message) does not work because message is not a variable 
 res.status(200).json({
  message: res.locals.message,
  token: res.locals.token,
  user_id : res.locals.id
});
  };

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR VERIFYING JWT TOKEN
//////////////////////////////////////////////////////
module.exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }
  
    const token = authHeader.substring(7);
  
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
  
    const callback = (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }
  
      res.locals.id = decoded.userId;
      res.locals.tokenTimestamp = decoded.timestamp;
      next();
    };
  
    jwt.verify(token, secretKey, callback);
  };

  // FOR ADMINS 
  module.exports.verifyAdminToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }
  
    const token = authHeader.substring(7);
  
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
  
    const callback = (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }
  
      res.locals.id = decoded.userId;
      res.locals.tokenTimestamp = decoded.timestamp;
      res.locals.role = decoded.isAdmin; 

      if (decoded.isAdmin == true) {
      next();
      }
      else {
        return res.status(401).json({ error: "You don't have admin privileges"});
      }
    };
  
    jwt.verify(token, secretKey, callback);
  };
