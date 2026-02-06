const mongoose = require("mongoose");

const assetsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["working", "broken", "maintenance"],
      default: "working",
    },
    location: {
      type: String,
      default: "clinic",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Assets", assetsSchema);
