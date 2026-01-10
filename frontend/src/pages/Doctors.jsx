import { useEffect, useState } from "react";
import API from "../services/api";
import DoctorForm from "../components/DoctorForm";
import DoctorList from "../components/DoctorList";
import "./Doctors.css";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    const res = await API.get("/doctors", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    setDoctors(res.data);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="doctors-page">
      <h1>Doctors</h1>
      <DoctorForm refresh={fetchDoctors} />
      <DoctorList doctors={doctors} refresh={fetchDoctors} />
    </div>
  );
};

export default Doctors;
