const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.Controller");

router.post("/register", authController.Register);
router.post("/login", authController.Login);
router.get("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logOut);

module.exports = router;
