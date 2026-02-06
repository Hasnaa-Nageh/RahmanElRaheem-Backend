const Patient = require("../models/patient");

// Patients
const createPatient = async (req, res, next) => {
  try {
    const { firstName, lastName, phone, visits } = req.body;

    const existPhone = await Patient.findOne({ phone });
    if (existPhone) {
      return res.status(400).json({
        status: "fail",
        message: "Patient with this phone already exists",
      });
    }

    const patient = await Patient.create({
      firstName,
      lastName,
      phone,
      visits: visits || [],
    });

    res.status(201).json({
      status: "success",
      message: "Patient created successfully",
      data: patient,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
// ------------------------------------------

const getAllPatient = async (req, res, next) => {
  try {
    const Patients = await Patient.find();

    if (Patients.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Patients Found" });
    }
    res.status(200).json({
      status: "success",
      results: Patients.length,
      data: Patients,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
// -------------------------------------------

const getSinglePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient Not Found" });
    }

    res.status(200).json({
      status: "success",
      data: patient,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
// ------------------------------------------

const searchPatient = async (req, res, next) => {
  try {
    const { keyword } = req.query;
    if (!keyword || keyword.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search keyword is required",
      });
    }
    const patients = await Patient.find({
      $or: [
        { firstName: { $regex: keyword, $options: "i" } },
        { lastName: { $regex: keyword, $options: "i" } },
        { phone: { $regex: keyword, $options: "i" } },
      ],
    });

    res.status(200).json({
      success: true,
      results: patients.length,
      data: patients,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
// ------------------------------------------

const updatePatient = async (req, res, next) => {
  try {
    const { firstName, lastName, phone } = req.body;

    const patient = await Patient.findByIdAndUpdate(
      req.params.patientId,
      { firstName, lastName, phone },
      { new: true, runValidators: true },
    );

    if (!patient) return res.status(404).json({ error: "Patient not found" });

    res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
//------------------------------------------

const deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.patientId);

    if (!patient) return res.status(404).json({ error: "Patient not found" });
    res.json({ message: "Patient deleted successfully" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
//----------------------------------------

// Visits

const AddVisit = async (req, res, next) => {
  try {
    const { patientId } = req.params;
    const { doctorName, notes, examType, price, date } = req.body;

    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ error: "Patient not found" });

    patient.visits.push({
      doctorName,
      examType,
      notes,
      price,
      date,
    });

    await patient.save();

    res.status(201).json({
      success: true,
      message: "Visit added successfully",
      data: patient,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
//------------------------------------------

const deleteVisit = async (req, res, next) => {
  try {
    const { visitId } = req.params;
    const patient = await Patient.findOne({ "visits._id": visitId });
    if (!patient) return res.status(404).json({ error: "Visit not found" });

    patient.visits.pull(visitId);
    await patient.save();
    res.json({ message: "Visit deleted successfully" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
//------------------------------------------

const updateVisit = async (req, res, next) => {
  try {
    const { visitId } = req.params;

    const patient = await Patient.findOne({ "visits._id": visitId });
    if (!patient) return res.status(404).json({ error: "Visit not found" });

    const visit = patient.visits.id(visitId);
    if (!visit) return res.status(404).json({ error: "Visit not found" });

    Object.assign(visit, req.body);

    await patient.save();

    res.status(200).json({
      success: true,
      message: "Visit updated successfully",
      data: visit,
    });
  } catch (err) {
    next(err);
  }
};
//------------------------------------------

const getPatientSummary = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.patientId);
    if (!patient) return res.status(404).json({ error: "Patient not found" });

    const totalVisits = patient.visits.length;
    const lastVisit = patient.visits[totalVisits - 1] || null;
    const visitsByType = {};
    patient.visits.forEach((v) => {
      visitsByType[v.examType] = (visitsByType[v.examType] || 0) + 1;
    });

    res.json({ totalVisits, lastVisit, visitsByType });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
//------------------------------------------

const getFullReport = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.patientId);
    if (!patient) return res.status(404).json({ error: "Patient not found" });

    res.json(patient);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
//------------------------------------------

module.exports = {
  createPatient,
  getAllPatient,
  getSinglePatient,
  searchPatient,
  updatePatient,
  deletePatient,
  AddVisit,
  updateVisit,
  deleteVisit,
  getPatientSummary,
  getFullReport,
};
