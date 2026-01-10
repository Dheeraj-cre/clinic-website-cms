const Gallery = require("../models/Gallery");

// Upload Image
exports.uploadImage = async (req, res) => {
  try {
    const image = await Gallery.create({
      imageUrl: `/uploads/${req.file.filename}`
    });
    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Images
exports.getImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
