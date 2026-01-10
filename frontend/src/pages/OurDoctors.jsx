import { useEffect, useState } from "react";
import API from "../services/api";
import "./OurDoctors.css";

const OurDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    const res = await API.get("/doctors"); // public read
    setDoctors(res.data);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="our-doctors">
      <h1>Our Doctors</h1>

      <div className="doctor-grid">
        {doctors.map(doc => (
          <div className="doctor-card" key={doc._id}>
            <h3>{doc.name}</h3>
            <p><strong>Specialization:</strong> {doc.specialization}</p>
            <p><strong>Qualification:</strong> {doc.qualification}</p>
            <p><strong>Experience:</strong> {doc.experience}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurDoctors;
