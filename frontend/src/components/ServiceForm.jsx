import { useState } from "react";
import API from "../services/api";
import "./ServiceForm.css"; // ✅ CSS import

const ServiceForm = ({ refresh }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await API.post(
      "/services",
      { title, description },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    setTitle("");
    setDescription("");
    refresh();
  };

  return (
    <form className="service-form" onSubmit={submit}>
      <div className="form-group">
        <label>Service Title</label>
        <input
          type="text"
          placeholder="Enter service title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button type="submit" className="submit-btn">
        Add Service
      </button>
    </form>
  );
};

export default ServiceForm;
