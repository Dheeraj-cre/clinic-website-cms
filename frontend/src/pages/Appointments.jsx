import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import API from "../services/api";
import "./Appointments.css";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [filter, setFilter] = useState("All");

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setAppointments(res.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const updateStatus = async (id, status) => {
    setLoadingId(id);
    try {
      await API.patch(
        `/appointments/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      );
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

  const filteredAppointments =
    filter === "All"
      ? appointments
      : appointments.filter((a) => a.status === filter);

  return (
    <DashboardLayout>
      <div className="appointments-container">

        {/* ===== Header ===== */}
        <div className="appointments-header">
          <div className="header-content">
            <div className="title-section">
              <div className="title-icon">📅</div>
              <div>
                <h1>Appointments</h1>
                <p className="subtitle">Manage patient appointments</p>
              </div>
            </div>

            <div className="filter-section">
              {["All", "Pending", "Approved", "Rejected"].map((status) => (
                <button
                  key={status}
                  className={filter === status ? "filter-btn active" : "filter-btn"}
                  onClick={() => setFilter(status)}
                >
                  {status} (
                  {status === "All"
                    ? appointments.length
                    : appointments.filter((a) => a.status === status).length}
                  )
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ===== List ===== */}
        <div className="appointments-list">
          {filteredAppointments.length === 0 ? (
            <div className="empty-state">
              <h3>No Appointments Found</h3>
              <p>
                There are no{" "}
                {filter !== "All" ? filter.toLowerCase() : ""} appointments
              </p>
            </div>
          ) : (
            filteredAppointments.map((a, index) => (
              <div
                key={a._id}
                className="appointment-card"
                style={{ "--card-index": index }}
              >
                <div className="card-header">
                  <div className="patient-info">
                    <div className="patient-details">
                      <h3>{a.patientName}</h3>

                      {/* Doctor */}
                      <p className="doctor-name">
                        <strong>Doctor:</strong> {a.doctorName || "Not Assigned"}
                      </p>

                      {/* Date */}
                      <p className="appointment-date">
                        <strong>Date:</strong>{" "}
                        {a.date
                          ? new Date(a.date).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "long",
                              day: "numeric"
                            })
                          : "N/A"}
                      </p>

                      {/* Address */}
                      {a.address && (
                        <p className="appointment-address">
                          <strong>Address:</strong> {a.address}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className={`status-badge ${a.status.toLowerCase()}`}>
                    {a.status}
                  </div>
                </div>

                {/* Problem */}
                {a.problem && (
                  <div className="appointment-reason">
                    <strong>Problem:</strong> {a.problem}
                  </div>
                )}

                {/* Actions */}
                <div className="card-actions">
                  <button
                    className="approve-btn"
                    onClick={() => updateStatus(a._id, "Approved")}
                    disabled={loadingId === a._id || a.status === "Approved"}
                  >
                    {loadingId === a._id ? "..." : "Approve"}
                  </button>

                  <button
                    className="reject-btn"
                    onClick={() => updateStatus(a._id, "Rejected")}
                    disabled={loadingId === a._id || a.status === "Rejected"}
                  >
                    {loadingId === a._id ? "..." : "Reject"}
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
