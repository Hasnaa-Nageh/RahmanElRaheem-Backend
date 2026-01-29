const express = require("express");
const getAllUsers = require("../controller/user.Controller");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyAdmin = require("../middlewares/VerifyAdmin")
const router = express.Router();

router.use(verifyJWT);
// router.use(verifyAdmin)
// router.get("/", verifyAdmin,getAllUsers);

module.exports = router;
