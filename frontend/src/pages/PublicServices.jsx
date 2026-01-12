import { useEffect, useState } from "react";
import API from "../services/api";
import "./PublicServices.css";

const PublicServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await API.get("/services"); 
      // NOTE: backend should return only active services for public
      setServices(res.data.filter(s => s.isActive));
    } catch (err) {
      setError("Failed to load services. Please try again later.");
      console.error("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="public-services">
      <h1>Our Services</h1>

      {loading && (
        <p className="empty">Loading services...</p>
      )}

      {error && (
        <p className="empty error">{error}</p>
      )}

      {!loading && !error && (
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
      )}
    </div>
  );
};

export default PublicServices;