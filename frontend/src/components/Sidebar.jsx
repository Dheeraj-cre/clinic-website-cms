import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">Clinic CMS</h3>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard">Dashboard</NavLink>

        {/* ✅ ADMIN ROUTES */}
        <NavLink to="/admin/doctors">Doctors</NavLink>
        <NavLink to="/admin/services">Services</NavLink>
        <NavLink to="/admin/appointments">Appointments</NavLink>
        <NavLink to="/admin/gallery">Gallery</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
