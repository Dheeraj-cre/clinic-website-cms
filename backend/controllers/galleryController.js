const Gallery = require("../models/Gallery");

// ======================
// ADMIN: Upload Image
// ======================
exports.uploadImage = async (req, res) => {
  try {
    const image = await Gallery.create({
      imageUrl: `/uploads/${req.file.filename}`
    });
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
