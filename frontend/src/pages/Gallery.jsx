import { useEffect, useState } from "react";
import API from "../services/api";
import DashboardLayout from "../components/DashboardLayout";
import "./Gallery.css";

const Gallery = () => {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);

  // Fetch images
  const fetchImages = async () => {
    const res = await API.get("/gallery");
    setImages(res.data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // File select + preview
  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  // Clear preview
  const clearPreview = () => {
    setFile(null);
    setPreview(null);
  };

  // Upload image
  const upload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      await API.post("/gallery", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFile(null);
      setPreview(null);
      fetchImages();
    } finally {
      setLoading(false);
    }
  };

  // Delete image
  const deleteImage = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      setDeleteLoading(id);
      await API.delete(`/gallery/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // update UI instantly
      setImages((prev) => prev.filter((img) => img._id !== id));
    } catch (err) {
      console.error("Delete failed");
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="gallery-container">
        {/* Upload Section */}
        <div className="upload-section">
          <form onSubmit={upload} className="upload-form">
            <div className="file-input-wrapper">
              <label htmlFor="file-input" className="file-input-label">
                <svg
                  className="upload-icon"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                {file ? file.name : "Choose Image"}
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
              />
            </div>

            {preview && (
              <div className="preview-container">
                <img src={preview} alt="Preview" className="preview-image" />
                <button
                  type="button"
                  onClick={clearPreview}
                  className="clear-preview"
                  aria-label="Clear preview"
                >
                  ×
                </button>
              </div>
            )}

            <button type="submit" disabled={loading || !file} className="upload-button">
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  <span style={{ marginLeft: "8px" }}>Uploading...</span>
                </>
              ) : (
                "Upload Image"
              )}
            </button>
          </form>
        </div>

        {/* Gallery Header */}
        {images.length > 0 && (
          <div className="gallery-header">
            <h2 className="gallery-title">Gallery</h2>
            <p className="gallery-count">
              {images.length} {images.length === 1 ? "image" : "images"}
            </p>
          </div>
        )}

        {/* Gallery Grid */}
        {images.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🖼️</div>
            <p className="empty-state-text">No images yet</p>
            <p className="empty-state-subtext">Upload your first image to get started</p>
          </div>
        ) : (
          <div className="gallery-grid">
            {images.map((img) => (
              <div key={img._id} className="gallery-card">
                <div className="gallery-image-wrapper">
                  <img
                    src={img.imageUrl}
                    alt="Clinic"
                    className="gallery-image"
                  />
                  <div className="image-overlay"></div>
                </div>

                <button
                  onClick={() => deleteImage(img._id)}
                  disabled={deleteLoading === img._id}
                  className="delete-button"
                >
                  {deleteLoading === img._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Gallery;