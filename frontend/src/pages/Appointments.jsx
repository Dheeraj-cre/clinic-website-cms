import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import API from "../services/api";
import "./Appointments.css";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [filter, setFilter] = useState("All");

  const fetchAppointments = async () => {
    const res = await API.get("/appointments", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    setAppointments(res.data);
  };

  const updateStatus = async (id, status) => {
    setLoadingId(id);
    try {
      await API.patch(`/appointments/${id}`, { status }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      fetchAppointments();
    } catch (error) {
      console.error("Error updating appointment:", error);
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const filteredAppointments = filter === "All" 
    ? appointments 
    : appointments.filter(a => a.status === filter);

  return (
    <DashboardLayout>
      <div className="appointments-container">
        <div className="appointments-header">
          <div className="header-content">
            <div className="title-section">
              <div className="title-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <div>
                <h1>Appointments</h1>
                <p className="subtitle">Manage patient appointments</p>
              </div>
            </div>
            
            <div className="filter-section">
              <button 
                className={filter === "All" ? "filter-btn active" : "filter-btn"}
                onClick={() => setFilter("All")}
              >
                All ({appointments.length})
              </button>
              <button 
                className={filter === "Pending" ? "filter-btn active" : "filter-btn"}
                onClick={() => setFilter("Pending")}
              >
                Pending ({appointments.filter(a => a.status === "Pending").length})
              </button>
              <button 
                className={filter === "Approved" ? "filter-btn active" : "filter-btn"}
                onClick={() => setFilter("Approved")}
              >
                Approved ({appointments.filter(a => a.status === "Approved").length})
              </button>
              <button 
                className={filter === "Rejected" ? "filter-btn active" : "filter-btn"}
                onClick={() => setFilter("Rejected")}
              >
                Rejected ({appointments.filter(a => a.status === "Rejected").length})
              </button>
            </div>
          </div>
        </div>

        <div className="appointments-list">
          {filteredAppointments.length === 0 ? (
            <div className="empty-state">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <h3>No Appointments Found</h3>
              <p>There are no {filter !== "All" ? filter.toLowerCase() : ""} appointments at the moment</p>
            </div>
          ) : (
            filteredAppointments.map((a, index) => (
              <div 
                key={a._id} 
                className="appointment-card"
                style={{ '--card-index': index }}
              >
                <div className="card-header">
                  <div className="patient-info">
                    <div className="patient-avatar">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div className="patient-details">
                      <h3>{a.patientName}</h3>
                      <div className="appointment-date">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>{new Date(a.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`status-badge ${a.status.toLowerCase()}`}>
                    <span className="status-dot"></span>
                    <span>{a.status}</span>
                  </div>
                </div>

                {a.reason && (
                  <div className="appointment-reason">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    <span>{a.reason}</span>
                  </div>
                )}

                <div className="card-actions">
                  <button 
                    className="approve-btn"
                    onClick={() => updateStatus(a._id, "Approved")}
                    disabled={loadingId === a._id || a.status === "Approved"}
                  >
                    {loadingId === a._id ? (
                      <div className="btn-spinner"></div>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                    <span>Approve</span>
                  </button>
                  
                  <button 
                    className="reject-btn"
                    onClick={() => updateStatus(a._id, "Rejected")}
                    disabled={loadingId === a._id || a.status === "Rejected"}
                  >
                    {loadingId === a._id ? (
                      <div className="btn-spinner"></div>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    )}
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Appointments;