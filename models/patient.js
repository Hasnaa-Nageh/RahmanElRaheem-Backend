const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  doctorName: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    default: "",
  },
  examType: {
    type: String,
    enum: ["باطنه", "عظام", "نساء", "اطفال", "اسنان"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
});
const patientSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    visits: [visitSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Patient", patientSchema);
