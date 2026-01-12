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

  // Fetch images (PUBLIC)
  const fetchImages = async () => {
    try {
      const res = await API.get("/gallery");
      setImages(res.data);
    } catch (err) {
      console.error("Failed to fetch images");
    }
  };

  // File select + preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(selectedFile);
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
        },
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
    if (!window.confirm("Delete this image?")) return;

    try {
      setDeleteLoading(id);
      await API.delete(`/gallery/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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

        {/* Upload Form */}
        <form onSubmit={upload} className="gallery-form">
          <h3>Upload New Image</h3>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="preview-image"
            />
          )}

          <button type="submit" disabled={loading || !file}>
            {loading ? "Uploading..." : "Upload Image"}
          </button>
        </form>

        {/* Images Grid */}
        {images.length > 0 ? (
          <div className="gallery-grid">
            {images.map((img) => (
              <div className="gallery-card" key={img._id}>
                <img
                  src={img.imageUrl}
                  alt="gallery"
                />
                <button
                  onClick={() => deleteImage(img._id)}
                  disabled={deleteLoading === img._id}
                >
                  {deleteLoading === img._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No images uploaded yet.</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Gallery;
