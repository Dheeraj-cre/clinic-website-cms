const express = require("express");
const {
  createService,
  getServices,
  toggleService,
  deleteService,
  getActiveServices
} = require("../controllers/serviceController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

/* 🔓 PUBLIC (User Website) */
router.get("/", getActiveServices);

/* 🔐 ADMIN (CMS) */
router.post("/", protect, createService);
router.patch("/:id", protect, toggleService);
router.delete("/:id", protect, deleteService);

module.exports = router;
