const express = require("express");
const {
  registerAdmin,
  loginAdmin
} = require("../controllers/authController");

const router = express.Router();

/**
 * TEST ROUTE
 * Use this to confirm routing works
 * http://localhost:5000/api/auth/test
 */
router.get("/test", (req, res) => {
  res.status(200).send("Auth route working");
});

// Register admin (one-time)
router.post("/register", registerAdmin);

// Login admin
router.post("/login", loginAdmin);

module.exports = router;
