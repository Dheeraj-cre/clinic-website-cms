import { useEffect, useState } from "react";
import API from "../services/api";
import DashboardLayout from "../components/DashboardLayout";
import "./Gallery.css";

const Gallery = () => {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [preview, setPreview] = useState(null);

  // Fetch images (PUBLIC GET, but admin can also use it)
  const fetchImages = async () => {
    try {
      const res = await API.get("/gallery");
      setImages(res.data);
    } catch (err) {
      console.error("Failed to fetch images");
    }
  };

  // Handle file selection with preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Upload image (ADMIN)
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
          "Content-Type": "multipart/form-data"
        }
      });
      setFile(null);
      setPreview(null);
      e.target.reset();
      fetchImages();
    } catch (err) {
      console.error("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  // Delete image (ADMIN)
  const deleteImage = async (id) => {
    const confirmDelete = window.confirm("Delete this image?");
    if (!confirmDelete) return;

    try {
      setDeleteLoading(id);
      await API.delete(`/gallery/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      fetchImages();
    } catch (err) {
      console.error("Failed to delete image");
    } finally {
      setDeleteLoading(null);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <DashboardLayout>
      <div className="gallery-page">
        <div className="gallery-header">
          <div className="header-content">
            <div className="header-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
            <div>
              <h1>Gallery Management</h1>
              <p className="subtitle">Upload and manage clinic images</p>
            </div>
          </div>
        </div>

        {/* Upload Form */}
        <form onSubmit={upload} className="gallery-form">
          <div className="form-header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            <h3>Upload New Image</h3>
          </div>

          <div className="upload-area">
            <input
              type="file"
              id="file-input"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="file-input"
            />
            <label htmlFor="file-input" className="file-label">
              {preview ? (
                <div className="preview-container">
                  <img src={preview} alt="Preview" className="preview-image" />
                  <div className="preview-overlay">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <span>Click to change image</span>
                  </div>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  <span>Click to select an image</span>
                  <span className="upload-hint">PNG, JPG, JPEG up to 10MB</span>
                </div>
              )}
            </label>
          </div>

          <button type="submit" className="upload-btn" disabled={loading || !file}>
            {loading ? (
              <>
                <div className="btn-spinner"></div>
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <span>Upload Image</span>
              </>
            )}
          </button>
        </form>

        {/* Images Grid */}
        {images.length > 0 ? (
          <div className="gallery-grid">
            {images.map((img) => (
              <div className="gallery-card" key={img._id}>
                <div className="image-wrapper">
                  <img
                    src={`http://localhost:5000${img.imageUrl}`}
                    alt="gallery"
                  />
                  <div className="image-overlay">
                    <button
                      className="delete-btn"
                      onClick={() => deleteImage(img._id)}
                      disabled={deleteLoading === img._id}
                    >
                      {deleteLoading === img._id ? (
                        <>
                          <div className="btn-spinner"></div>
                          <span>Deleting...</span>
                        </>
                      ) : (
                        <>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                          <span>Delete</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <h3>No Images Yet</h3>
            <p>Upload your first image to get started</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Gallery;