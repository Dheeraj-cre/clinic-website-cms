import { useState } from "react";
import API from "../services/api";
import "./DoctorList.css";

const DoctorList = ({ doctors, refresh }) => {
  const [loadingId, setLoadingId] = useState(null);

  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) {
      return;
    }

    setLoadingId(id);
    try {
      await API.delete(`/doctors/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      refresh();
    } catch (error) {
      console.error("Error deleting doctor:", error);
      alert("Failed to delete doctor. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="doctor-list-container">
      {doctors.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h3>No Doctors Found</h3>
          <p>Add your first doctor to get started</p>
        </div>
      ) : (
        <div className="doctor-grid">
          {doctors.map((d) => (
            <div key={d._id} className="doctor-card">
              <div className="card-header">
                <div className="doctor-avatar">
                  {d.name.charAt(0).toUpperCase()}
                </div>
                <div className="status-badge">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Active</span>
                </div>
              </div>

              <div className="card-body">
                <h3 className="doctor-name">Dr. {d.name}</h3>
                
                <div className="info-grid">
                  <div className="info-item">
                    <div className="info-icon specialization">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <div className="info-text">
                      <span className="info-label">Specialization</span>
                      <span className="info-value">{d.specialization || "N/A"}</span>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon qualification">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                      </svg>
                    </div>
                    <div className="info-text">
                      <span className="info-label">Qualification</span>
                      <span className="info-value">{d.qualification || "N/A"}</span>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon experience">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                    <div className="info-text">
                      <span className="info-label">Experience</span>
                      <span className="info-value">{d.experience ? `${d.experience} Years` : "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <button 
                  className="action-btn delete-btn" 
                  onClick={() => remove(d._id)}
                  disabled={loadingId === d._id}
                >
                  {loadingId === d._id ? (
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
                      <span>Delete Doctor</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorList;