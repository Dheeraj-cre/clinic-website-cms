import { useEffect, useState } from "react";
import API from "../services/api";
import "./Gallery.css";

const Gallery = () => {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    const res = await API.get("/gallery", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    setImages(res.data);
  };

  const upload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);

    await API.post("/gallery", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data"
      }
    });
    setFile(null);
    fetchImages();
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="gallery-page">
      <h1>Gallery</h1>

      <form onSubmit={upload} className="gallery-form">
        <input type="file" onChange={e => setFile(e.target.files[0])} required />
        <button>Upload</button>
      </form>

      <div className="gallery-grid">
        {images.map(img => (
          <img
            key={img._id}
            src={`http://localhost:5000${img.imageUrl}`}
            alt="gallery"
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
