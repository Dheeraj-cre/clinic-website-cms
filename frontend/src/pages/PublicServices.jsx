import { useEffect, useState } from "react";
import API from "../services/api";
import "./PublicServices.css";

const PublicServices = () => {
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    const res = await API.get("/services"); 
    // NOTE: backend should return only active services for public
    setServices(res.data.filter(s => s.isActive));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="public-services">
      <h1>Our Services</h1>

      <div className="service-grid">
        {services.length === 0 && (
          <p className="empty">No services available at the moment.</p>
        )}

        {services.map(service => (
          <div className="service-card" key={service._id}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicServices;
