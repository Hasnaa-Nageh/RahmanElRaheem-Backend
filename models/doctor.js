const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    hospital: {
      type: String,
      default: "",
    },
  },
  { timestamps: TextTrackCueList },
);

module.exports = mongoose.model("Doctor", doctorSchema);