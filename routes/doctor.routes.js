const express = require("express");
const doctorController = require("../controller/doctor.controller");
const verifyJWT = require("../middlewares/verifyJWT");
const validate = require("../middlewares/validate");
const router = express.Router();

router.use(verifyJWT);

router.post("/create", doctorController.createDoctor);
router.get("/all", doctorController.getAllDoctor);
router.get("/search", doctorController.searchDoctor);
router.get("/:doctorId", doctorController.getSingleDoctor);
router.put("/:doctorId", doctorController.updateDoctor);
router.delete("/:doctorId", doctorController.deleteDoctor);

module.exports = router;
