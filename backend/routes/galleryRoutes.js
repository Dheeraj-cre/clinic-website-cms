const express = require("express");
const multer = require("multer");
const {
  uploadImage,
  getPublicImages,
  deleteImage
} = require("../controllers/galleryController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Cloudinary-ready multer config (NO disk, NO temp folder)
const upload = multer({
  storage: multer.memoryStorage(),
});

/* PUBLIC (Website) */
router.get("/", getPublicImages);

/* ADMIN (CMS) */
router.post("/", protect, upload.single("image"), uploadImage);
router.delete("/:id", protect, deleteImage);

module.exports = router;
