const express = require("express");
const getAllUsers = require("../controller/user.Controller");
const verifyJWT = require("../middlewares/verifyJWT");
const router = express.Router();

router.use(verifyJWT);
router.get("/", getAllUsers);

module.exports = router;
