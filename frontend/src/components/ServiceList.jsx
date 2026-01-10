import API from "../services/api";
import "./ServiceList.css";   // ✅ ADD THIS

const ServiceList = ({ services, refresh }) => {
  const toggle = async (id) => {
    await API.patch(`/services/${id}`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    refresh();
  };

  const remove = async (id) => {
    await API.delete(`/services/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    refresh();
  };

  return (
    <div className="service-list">
      {services.map(s => (
        <div className="service-card" key={s._id}>
          <h3>{s.title}</h3>
          <p>{s.description}</p>
          <p className={s.isActive ? "status active" : "status inactive"}>
            {s.isActive ? "Active" : "Inactive"}
          </p>

          <div className="service-actions">
            <button className="toggle-btn" onClick={() => toggle(s._id)}>
              Toggle
            </button>
            <button className="delete-btn" onClick={() => remove(s._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
