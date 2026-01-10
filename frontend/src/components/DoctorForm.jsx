import { useState } from "react";
import API from "../services/api";
import "./DoctorForm.css";   // ✅ ADD THIS

const DoctorForm = ({ refresh }) => {
  const [form, setForm] = useState({
    name: "",
    qualification: "",
    experience: "",
    specialization: ""
  });

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/doctors", form, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    setForm({ name: "", qualification: "", experience: "", specialization: "" });
    refresh();
  };

  return (
    <form onSubmit={submit} className="doctor-form">
      <input
        placeholder="Name"
        required
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Qualification"
        value={form.qualification}
        onChange={e => setForm({ ...form, qualification: e.target.value })}
      />
      <input
        placeholder="Experience"
        value={form.experience}
        onChange={e => setForm({ ...form, experience: e.target.value })}
      />
      <input
        placeholder="Specialization"
        value={form.specialization}
        onChange={e => setForm({ ...form, specialization: e.target.value })}
      />
      <button>Add Doctor</button>
    </form>
  );
};

export default DoctorForm;
