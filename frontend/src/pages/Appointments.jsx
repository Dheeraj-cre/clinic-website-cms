import { useEffect, useState } from "react";
import API from "../services/api";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const res = await API.get("/appointments", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    setAppointments(res.data);
  };

  const updateStatus = async (id, status) => {
    await API.patch(`/appointments/${id}`, { status }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    fetchAppointments();
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div>
      <h1>Appointments</h1>
      {appointments.map(a => (
        <div key={a._id}>
          <p>{a.patientName} - {a.date}</p>
          <p>Status: {a.status}</p>
          <button onClick={() => updateStatus(a._id, "Approved")}>Approve</button>
          <button onClick={() => updateStatus(a._id, "Rejected")}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default Appointments;
