const express = require("express");
const patientController = require("../controller/patient.controller");
const verifyJWT = require("../middlewares/verifyJWT");
const { patientSchema } = require("../validation/patientSchema");
const validate = require("../middlewares/validate");
const router = express.Router();

router.use(verifyJWT);
router.post(
  "/create",
  validate(patientSchema),
  patientController.createPatient,
);
router.get("/all", patientController.getAllPatient);
router.get("/search", patientController.searchPatient);
router.get("/:patientId", patientController.getSinglePatient);
router.put("/:patientId", patientController.updatePatient);
router.delete("/:patientId", patientController.deletePatient);


//Visits
//Add Visit to patient
router.post("/:patientId/visits",patientController.AddVisit);
router.delete("/visits/:visitId",patientController.deleteVisit);
router.put("/visits/:visitId",patientController.updateVisit);

// Patient summary
router.get("/:patientId/summary", patientController.getPatientSummary);

// Full report
router.get("/:patientId/report", patientController.getFullReport);

module.exports = router;
