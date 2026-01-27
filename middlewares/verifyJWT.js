require("dotenv").config();
const jwt = require("jsonwebtoken");

//For Access token
const verifyJWT = (req, res, next) => {
  try {
    const authHeaders = req.headers.authorization || req.headers.Authorization;
    if (authHeaders?.startswith("Bearer ")) {
      return res.status(401).json({ message: "unAuthorized" });
    }

    const token = authHeaders.split(" ")[1]; //["Bearer","token"]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
      req.user = decoded.UserInfo.id;
      next();
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = verifyJWT;
