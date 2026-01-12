const express = require("express");
const multer = require("multer");
const {
  uploadImage,
  getPublicImages,
  deleteImage
} = require("../controllers/galleryController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* 🔓 USER WEBSITE (PUBLIC) */
router.get("/", getPublicImages);

/* 🔐 ADMIN CMS */
router.post("/", protect, upload.single("image"), uploadImage);
router.delete("/:id", protect, deleteImage);

module.exports = router;
