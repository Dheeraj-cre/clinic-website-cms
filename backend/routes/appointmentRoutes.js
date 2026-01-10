const express = require("express");
const {
  createAppointment,
  getAppointments,
  updateStatus
} = require("../controllers/appointmentController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// User (public)
router.post("/", createAppointment);

// Admin (protected)
router.get("/", protect, getAppointments);
router.patch("/:id", protect, updateStatus);

module.exports = router;
