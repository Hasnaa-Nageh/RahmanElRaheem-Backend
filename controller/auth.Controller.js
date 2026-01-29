const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");
require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Register = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: "All Fields are Required" });
    }

    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email,
      password: hashPassword,
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("jwt", refreshToken, {
      // httpOnly: true,
      // secure: true,
      sameSite: "None",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    res.status(201).json({
      message: "User Registered Successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    next(err);
  }
};

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(409).json({ message: "User not found" });
    }

    const matchedPassword = await bcrypt.compare(password, foundUser.password);

    if (!matchedPassword) {
      return res.status(401).json({ message: "Wrong Password" });
    }
    const accessToken = generateAccessToken(foundUser);
    const refreshToken = generateRefreshToken(foundUser);

    res.cookie("jwt", refreshToken, {
      // httpOnly: true,
      // secure: true,
      sameSite: "None",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    res.status(200).json({
      message: "Login Successfully",
      accessToken,
      email: foundUser.email,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const refreshToken = cookies.jwt;

    jwt.verify(
      refreshToken,
      process.env.Refresh_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: "Forbidden" });
        }
        const foundUser = await User.findById(decoded.UserInfo.id).exec();

        if (!foundUser) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        const accessToken = generateAccessToken(foundUser);

        res.status(200).json({ accessToken });
      },
    );
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const logOut = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.status(204);
    }
    res.clearCookie("jwt", {
      // httpOnly: true,
      // sameSite: "None",
      secure: "true",
    });
    res.status(200).json({ message: "Logout Successfully" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { Register, Login, refreshToken, logOut };
