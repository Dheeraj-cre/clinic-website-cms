import { useState } from "react";
import API from "../services/api";
import "./ServiceForm.css";

const ServiceForm = ({ refresh }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await API.post(
        "/services",
        { title, description },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setTitle("");
      setDescription("");
      refresh();
    } catch (error) {
      console.error("Error adding service:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="service-form" onSubmit={submit}>
      <div className="form-header">
        <div className="form-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14"></path>
          </svg>
        </div>
        <h3>Add New Service</h3>
      </div>

      <div className="form-group">
        <label htmlFor="service-title">
          Service Title
          <span className="required">*</span>
        </label>
        <div className="input-wrapper">
          <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 7h-9M14 17H5M17 12h3M4 12h9"></path>
          </svg>
          <input
            id="service-title"
            type="text"
            placeholder="Enter service title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="service-description">
          Description
        </label>
        <div className="input-wrapper">
          <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          <textarea
            id="service-description"
            placeholder="Enter service description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            disabled={isLoading}
          />
        </div>
      </div>

      <button type="submit" className="submit-btn" disabled={isLoading}>
        {isLoading ? (
          <>
            <div className="spinner"></div>
            <span>Adding Service...</span>
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14"></path>
            </svg>
            <span>Add Service</span>
          </>
        )}
      </button>
    </form>
  );
};

export default ServiceForm;