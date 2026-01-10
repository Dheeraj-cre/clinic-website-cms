const Service = require("../models/Service");

// Create Service
exports.createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Toggle Active
exports.toggleService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    service.isActive = !service.isActive;
    await service.save();
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Service
exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Active Services (PUBLIC - User Website)
exports.getActiveServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({
      createdAt: -1
    });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

