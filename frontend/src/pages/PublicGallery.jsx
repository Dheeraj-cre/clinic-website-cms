import { useEffect, useState } from "react";
import API from "../services/api";
import "./PublicGallery.css";

const PublicGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await API.get("/gallery");
        setImages(res.data);
      } catch (err) {
        console.error("Failed to load gallery");
      }
    };

    fetchImages();
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
            src={img.imageUrl}
            alt="clinic"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
};

export default PublicGallery;
