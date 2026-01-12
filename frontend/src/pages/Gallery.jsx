import { useEffect, useState } from "react";
import API from "../services/api";
import DashboardLayout from "../components/DashboardLayout";

const Gallery = () => {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const fetchImages = async () => {
    const res = await API.get("/gallery");
    setImages(res.data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

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

  return (
    <DashboardLayout>
      <form onSubmit={upload}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && <img src={preview} width="200" />}
        <button disabled={loading}>{loading ? "Uploading..." : "Upload"}</button>
      </form>

      <div>
        {images.map((img) => (
          <img key={img._id} src={img.imageUrl} width="200" />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Gallery;
