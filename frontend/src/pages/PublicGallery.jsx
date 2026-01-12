import { useEffect, useState } from "react";
import API from "../services/api";
import "./PublicGallery.css";

const PublicGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    API.get("/gallery").then((res) => setImages(res.data));
  }, []);

  return (
    <div className="public-gallery">
      <h1>Clinic Gallery</h1>

      {images.length === 0 && (
        <p className="empty">No images available.</p>
      )}

      <div className="gallery-grid">
        {images.map((img) => (
          <img
            key={img._id}
            src={`http://localhost:5000${img.imageUrl}`}
            alt="clinic"
          />
        ))}
      </div>
    </div>
  );
};

export default PublicGallery;
