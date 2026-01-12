const Gallery = require("../models/Gallery");
const cloudinary = require("../config/cloudinary");

// ======================
// ADMIN: Upload Image (Cloudinary)
// ======================
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
        folder: "clinic-gallery",
      }
    );

    const image = await Gallery.create({
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });

    res.status(201).json(image);
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({ message: "Image upload failed" });
  }
};

// ======================
// USER: Get Images (PUBLIC)
// ======================
exports.getPublicImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======================
// ADMIN: Delete Image
// ======================
exports.deleteImage = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
