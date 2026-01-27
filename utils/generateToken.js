const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      UserInfo: {
        id: user._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" },
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      UserInfo: {
        id: user._id,
      },
    },
    process.env.Refresh_TOKEN_SECRET,
    { expiresIn: "7d" },
  );
};


module.exports = {generateAccessToken,generateRefreshToken};
