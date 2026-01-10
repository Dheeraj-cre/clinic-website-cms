const Doctor = require("../models/Doctor");
const Service = require("../models/Service");
const Appointment = require("../models/Appointment");

exports.getStats = async (req, res) => {
  try {
    const doctors = await Doctor.countDocuments();
    const services = await Service.countDocuments();
    const appointments = await Appointment.countDocuments();

    res.json({
      doctors,
      services,
      appointments
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
