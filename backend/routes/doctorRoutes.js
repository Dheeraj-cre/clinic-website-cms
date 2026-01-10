const express = require("express");
const {
  createDoctor,
  getDoctors,
  getPublicDoctors,
  deleteDoctor
} = require("../controllers/doctorController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

/* 🔓 USER WEBSITE */
router.get("/", getPublicDoctors);

/* 🔐 ADMIN CMS */
router.post("/", protect, createDoctor);
router.get("/admin", protect, getDoctors);
router.delete("/:id", protect, deleteDoctor);

module.exports = router;
