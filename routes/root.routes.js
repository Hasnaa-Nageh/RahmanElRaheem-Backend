const express = require("express");
const router = express.Router();
const path = require("path");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const patientRoutes = require("./patient.routes.js");
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.use("/auth", authRoutes);
router.use("/patient",patientRoutes)
// router.use("/user", userRoutes);
module.exports = router;
