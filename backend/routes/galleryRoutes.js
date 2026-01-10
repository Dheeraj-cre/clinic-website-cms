const express = require("express");
const multer = require("multer");
const {
  uploadImage,
  getImages
} = require("../controllers/galleryController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/", protect, upload.single("image"), uploadImage);
router.get("/", protect, getImages);

module.exports = router;
