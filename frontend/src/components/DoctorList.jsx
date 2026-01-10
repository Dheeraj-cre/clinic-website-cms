import API from "../services/api";

const DoctorList = ({ doctors, refresh }) => {
  const remove = async (id) => {
    await API.delete(`/doctors/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    refresh();
  };

  return (
    <div className="doctor-list">
      {doctors.map(d => (
        <div key={d._id} className="doctor-card">
          <h3>{d.name}</h3>
          <p>{d.specialization}</p>
          <button onClick={() => remove(d._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default DoctorList;
