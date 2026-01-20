import { useState } from "react";
import API from "../services/api";
import "./DoctorList.css";

const DoctorList = ({ doctors, refresh }) => {
  const [loadingId, setLoadingId] = useState(null);

  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;

    setLoadingId(id);
    try {
      await API.delete(`/doctors/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      refresh();
    } catch (error) {
      console.error("Error deleting doctor:", error);
      alert("Failed to delete doctor.");
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
        <div className="table-wrapper">
          <table className="doctor-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Specialization</th>
                <th>Qualification</th>
                <th>Experience</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((d, index) => (
                <tr key={d._id}>
                  <td data-label="#">{index + 1}</td>
                  <td data-label="Name">
                    <div className="doctor-name-cell">
                      <div className="doctor-avatar-small">
                        {d.name.charAt(0).toUpperCase()}
                      </div>
                      <span>Dr. {d.name}</span>
                    </div>
                  </td>
                  <td data-label="Specialization">{d.specialization || "N/A"}</td>
                  <td data-label="Qualification">{d.qualification || "N/A"}</td>
                  <td data-label="Experience">
                    {d.experience
                      ? `${d.experience} ${d.experience === 1 ? "Year" : "Years"}`
                      : "N/A"}
                  </td>
                  <td data-label="Status">
                    <span className="status-badge active">Active</span>
                  </td>
                  <td data-label="Action">
                    <button
                      className="delete-btn"
                      onClick={() => remove(d._id)}
                      disabled={loadingId === d._id}
                    >
                      {loadingId === d._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DoctorList;