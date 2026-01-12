import { useEffect, useState } from "react";
import API from "../services/api";
import DoctorForm from "../components/DoctorForm";
import DoctorList from "../components/DoctorList";
import DashboardLayout from "../components/DashboardLayout";
// import "./Doctors.css";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const res = await API.get("/doctors/admin", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setDoctors(res.data);
    } catch (error) {
      console.error("Failed to fetch doctors");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <DashboardLayout>
      <div className="doctors-page">
        <h1>Doctors</h1>
        <DoctorForm refresh={fetchDoctors} />
        <DoctorList doctors={doctors} refresh={fetchDoctors} />
      </div>
    </DashboardLayout>
  );
};

export default Doctors;
