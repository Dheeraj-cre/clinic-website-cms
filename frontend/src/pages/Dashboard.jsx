import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import DashboardCard from "../components/DashboardCard";
import API from "../services/api";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    doctors: 0,
    services: 0,
    appointments: 0
  });

  const fetchStats = async () => {
    try {
      const res = await API.get("/stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setStats(res.data);
    } catch (error) {
      console.error("Failed to fetch stats");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="dashboard-grid">
        <DashboardCard title="Doctors" value={stats.doctors} />
        <DashboardCard title="Services" value={stats.services} />
        <DashboardCard title="Appointments" value={stats.appointments} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
