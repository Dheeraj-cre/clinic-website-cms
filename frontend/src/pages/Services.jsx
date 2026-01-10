import { useEffect, useState } from "react";
import API from "../services/api";
import ServiceForm from "../components/ServiceForm";
import ServiceList from "../components/ServiceList";
import Loader from "../components/Loader";
import "./Services.css";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await API.get("/services", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setServices(res.data);
    } catch (err) {
      alert("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="services-page">
      {loading && <Loader />}
      <h1>Services</h1>
      <ServiceForm refresh={fetchServices} />
      <ServiceList services={services} refresh={fetchServices} />
    </div>
  );
};

export default Services;
