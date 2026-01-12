import { useState } from "react";
import API from "../services/api";
import "./DoctorForm.css";

const DoctorForm = ({ refresh }) => {
  const [form, setForm] = useState({
    name: "",
    qualification: "",
    experience: "",
    specialization: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await API.post("/doctors", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setForm({ name: "", qualification: "", experience: "", specialization: "" });
      refresh();
    } catch (error) {
      console.error("Error adding doctor:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="doctor-form">
      <div className="form-header">
        <div className="form-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
        </div>
        <h3>Add New Doctor</h3>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="doctor-name">
            Doctor Name
            <span className="required">*</span>
          </label>
          <div className="input-wrapper">
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <input
              id="doctor-name"
              type="text"
              placeholder="Enter doctor's full name"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="doctor-qualification">
            Qualification
          </label>
          <div className="input-wrapper">
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
            <input
              id="doctor-qualification"
              type="text"
              placeholder="e.g., MBBS, MD"
              value={form.qualification}
              onChange={e => setForm({ ...form, qualification: e.target.value })}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="doctor-experience">
            Experience
          </label>
          <div className="input-wrapper">
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <input
              id="doctor-experience"
              type="text"
              placeholder="e.g., 5 years"
              value={form.experience}
              onChange={e => setForm({ ...form, experience: e.target.value })}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="doctor-specialization">
            Specialization
          </label>
          <div className="input-wrapper">
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
            <input
              id="doctor-specialization"
              type="text"
              placeholder="e.g., Cardiologist"
              value={form.specialization}
              onChange={e => setForm({ ...form, specialization: e.target.value })}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      <button type="submit" className="submit-btn" disabled={isLoading}>
        {isLoading ? (
          <>
            <div className="spinner"></div>
            <span>Adding Doctor...</span>
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
            <span>Add Doctor</span>
          </>
        )}
      </button>
    </form>
  );
};

export default DoctorForm;