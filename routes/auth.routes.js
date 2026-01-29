const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.Controller");
const validate = require("../middlewares/validate");
const { loginSchema } = require("../validation/auth.schema");

router.post("/register", authController.Register);
router.post("/login", validate(loginSchema), authController.Login);
router.get("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logOut);

module.exports = router;
