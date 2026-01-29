const express = require("express");
const router = express.Router();
const path = require("path");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.use("/auth", authRoutes);
// router.use("/user", userRoutes);
module.exports = router;
