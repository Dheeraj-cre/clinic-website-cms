import { useState } from "react";
import API from "../services/api";
import "./ServiceList.css";

const ServiceList = ({ services, refresh }) => {
  const [loadingId, setLoadingId] = useState(null);

  const toggle = async (id) => {
    setLoadingId(id);
    try {
      await API.patch(`/services/${id}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      refresh();
    } catch (error) {
      console.error("Error toggling service:", error);
    } finally {
      setLoadingId(null);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) {
      return;
    }
    
    setLoadingId(id);
    try {
      await API.delete(`/services/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      refresh();
    } catch (error) {
      console.error("Error deleting service:", error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="service-list">
      {services.length === 0 ? (
        <div className="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <h3>No Services Found</h3>
          <p>Add your first service to get started</p>
        </div>
      ) : (
        services.map((s, index) => (
          <div 
            className="service-card" 
            key={s._id}
            style={{ '--card-index': index }}
          >
            <div className="card-header">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 7h-9M14 17H5M17 12h3M4 12h9"></path>
                </svg>
              </div>
              <div className="status-badge">
                <span className={s.isActive ? "status active" : "status inactive"}>
                  <span className="status-dot"></span>
                  {s.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            <div className="card-content">
              <h3>{s.title}</h3>
              <p>{s.description || "No description provided"}</p>
            </div>

            <div className="service-actions">
              <button 
                className="toggle-btn" 
                onClick={() => toggle(s._id)}
                disabled={loadingId === s._id}
              >
                {loadingId === s._id ? (
                  <>
                    <div className="btn-spinner"></div>
                    <span>Toggling...</span>
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v20M2 12h20"></path>
                    </svg>
                    <span>Toggle Status</span>
                  </>
                )}
              </button>
              <button 
                className="delete-btn" 
                onClick={() => remove(s._id)}
                disabled={loadingId === s._id}
              >
                {loadingId === s._id ? (
                  <>
                    <div className="btn-spinner"></div>
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    <span>Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ServiceList;