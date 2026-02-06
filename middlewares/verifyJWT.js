require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  try {
    const authHeader =
      req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "fail",
        message: "Authorization token is missing",
      });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          status: "fail",
          message: "Invalid or expired token",
        });
      }

      req.user = decoded.UserInfo?.id || decoded.id;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "JWT verification failed",
      error: error.message,
    });
  }
};

module.exports = verifyJWT;
