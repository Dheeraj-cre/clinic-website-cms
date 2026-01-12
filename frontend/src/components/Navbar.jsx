import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
              <path d="M12 14v7"></path>
              <path d="M9 18h6"></path>
            </svg>
          </div>
          <span className="logo-text">City Care Clinic</span>
        </div>

        <nav className="nav-links">
          <NavLink to="/" end>
            <span>Home</span>
          </NavLink>
          <NavLink to="/our-doctors">
            <span>Doctors</span>
          </NavLink>
          <NavLink to="/services">
            <span>Services</span>
          </NavLink>
          <NavLink to="/gallery">
            <span>Gallery</span>
          </NavLink>
          <NavLink to="/book-appointment" className="cta">
            <span>Book Appointment</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;