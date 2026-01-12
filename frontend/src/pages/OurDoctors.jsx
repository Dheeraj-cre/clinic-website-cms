import { useEffect, useState } from "react";
import API from "../services/api";
import "./OurDoctors.css";

const OurDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await API.get("/doctors"); // public read
      setDoctors(res.data);
    } catch (err) {
      setError("Failed to load doctors. Please try again later.");
      console.error("Error fetching doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="our-doctors">
      <h1>Our Doctors</h1>

      {loading && (
        <p className="loading">Loading doctors...</p>
      )}

      {error && (
        <p className="empty error">{error}</p>
      )}

      {!loading && !error && (
        <div className="doctors-grid">
          {doctors.length === 0 && (
            <p className="empty">No doctors available at the moment.</p>
          )}

          {doctors.map((doc) => (
            <div className="doctor-card" key={doc._id}>
              <div className="doctor-avatar">
                {doc.name.charAt(0).toUpperCase()}
              </div>

              <div className="doctor-details">
                <h3 className="doctor-name">Dr. {doc.name}</h3>
                <p className="doctor-spec">{doc.specialization}</p>
                
                <div className="doctor-info">
                  <span>
                    <strong>Qualification:</strong> {doc.qualification}
                  </span>
                  <span>
                    <strong>Experience:</strong> {doc.experience} Years
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OurDoctors;