const express = require("express");
const multer = require("multer");
const {
  uploadImage,
  getPublicImages,
  deleteImage
} = require("../controllers/galleryController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

//  TEMP storage (Cloudinary ke liye best)
const upload = multer({ dest: "temp/" });

/*  USER WEBSITE (PUBLIC) */
router.get("/", getPublicImages);

/* ADMIN CMS */
router.post("/", protect, upload.single("image"), uploadImage);
router.delete("/:id", protect, deleteImage);

module.exports = router;
