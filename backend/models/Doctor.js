const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qualification: String,
  experience: String,
  specialization: String,
  image: String
}, { timestamps: true });

module.exports = mongoose.model("Doctor", doctorSchema);
