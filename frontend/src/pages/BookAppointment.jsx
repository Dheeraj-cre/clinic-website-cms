import { useState } from "react";
import API from "../services/api";
import "./BookAppointment.css";

const BookAppointment = () => {
  const [form, setForm] = useState({
    patientName: "",
    phone: "",
    email: "",
    problem: "",
    date: ""
  });

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/appointments", form);
    alert("Appointment booked successfully");
    setForm({
      patientName: "",
      phone: "",
      email: "",
      problem: "",
      date: ""
    });
  };

  return (
    <div className="appointment-wrapper">
      <h2 className="appointment-title">Book Appointment</h2>

      <form onSubmit={submit} className="appointment-table">
        <div className="row">
          <label>Patient Name</label>
          <input
            type="text"
            required
            value={form.patientName}
            onChange={(e) =>
              setForm({ ...form, patientName: e.target.value })
            }
          />
        </div>

        <div className="row">
          <label>Phone</label>
          <input
            type="text"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <div className="row">
          <label>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="row">
          <label>Problem</label>
          <input
            type="text"
            value={form.problem}
            onChange={(e) => setForm({ ...form, problem: e.target.value })}
          />
        </div>

        <div className="row">
          <label>Date</label>
          <input
            type="date"
            required
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>

        <div className="row submit-row">
          <button type="submit">Book Appointment</button>
        </div>
      </form>
    </div>
  );
};

export default BookAppointment;
