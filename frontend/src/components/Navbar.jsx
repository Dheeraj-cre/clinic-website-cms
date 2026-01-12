import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
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

          {/* Mobile Toggle Button */}
          <button 
            className={`menu-toggle ${isOpen ? 'active' : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          {/* Navigation Links */}
          <nav className={`nav-links ${isOpen ? 'active' : ''}`}>
            <NavLink to="/" end onClick={closeMenu}>
              <span>Home</span>
            </NavLink>
            <NavLink to="/our-doctors" onClick={closeMenu}>
              <span>Doctors</span>
            </NavLink>
            <NavLink to="/services" onClick={closeMenu}>
              <span>Services</span>
            </NavLink>
            <NavLink to="/gallery" onClick={closeMenu}>
              <span>Gallery</span>
            </NavLink>
            <NavLink to="/book-appointment" className="cta" onClick={closeMenu}>
              <span>Book Appointment</span>
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div className={`nav-overlay ${isOpen ? 'active' : ''}`} onClick={closeMenu}></div>
    </>
  );
};

export default Navbar;