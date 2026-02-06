const Doctor = require("../models/doctor");

const createDoctor = async (req, res, next) => {
  try {
    const { name, phone, specialty, hospital } = req.body;

    const existPhone = await Doctor.findOne({ phone });
    if (existPhone) {
      return res.status(400).json({
        status: "fail",
        message: "Doctor with this phone already exists",
      });
    }
    const doctor = await Doctor.create({
      name,
      phone,
      specialty,
      hospital,
    });

    res.status(201).json({
      status: "success",
      message: "Doctor created successfully",
      data: doctor,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getAllDoctor = async (req, res, next) => {
  try {
    const doctors = await Doctor.find();
    if (doctors.length === 0) {
      return res.status(200).json({ message: "No Doctor Found" });
    }
    res.status(200).json({
      status: "success",
      results: doctors.length,
      data: doctors,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getSingleDoctor = async (req, res, next) => {
  try {
    const { doctorId } = req.params;
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        message: "Doctor Not Found",
      });
    }
    res.status(200).json({
      status: "success",
      data: doctor,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const updateDoctor = async (req, res, next) => {
  try {
    const { doctorId } = req.params;
    const { name, phone, specialty, hospital } = req.body;

    if (phone) {
      const existingDoctor = await Doctor.findOne({
        phone,
        _id: { $ne: doctorId },
      });

      if (existingDoctor) {
        return res.status(400).json({
          status: "fail",
          message: "Phone already used by another doctor",
        });
      }
    }

    const doctor = await Doctor.findByIdAndUpdate(
      doctorId,
      {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(specialty && { specialty }),
        ...(hospital && { hospital }),
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!doctor) {
      return res.status(404).json({
        status: "fail",
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Doctor updated successfully",
      data: doctor,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const deleteDoctor = async (req, res, next) => {
  try {
    const { doctorId } = req.params;
    const doctor = await Doctor.findByIdAndDelete(doctorId);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor Not Found",
      });
    }
    res.json({ message: "Doctor deleted successfully" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const searchDoctor = async (req, res, next) => {
  try {
    const { keyword } = req.query;

    if (!keyword || keyword.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search keyword is required",
      });
    }

    const doctors = await Doctor.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { phone: { $regex: keyword, $options: "i" } },
        { specialty: { $regex: keyword, $options: "i" } },
        { hospital: { $regex: keyword, $options: "i" } },
      ],
    });

    res.status(200).json({
      success: true,
      results: doctors.length,
      data: doctors,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  createDoctor,
  getAllDoctor,
  getSingleDoctor,
  updateDoctor,
  deleteDoctor,
  searchDoctor,
};
