import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Clinic Info */}
        <div>
          <h3>City Care Clinic</h3>
          <p>
            Trusted healthcare with experienced doctors and modern facilities.
          </p>

          {/* ✅ Admin Login link */}
          <span
            style={{
              cursor: "pointer",
              color: "#007bff",
              fontSize: "14px",
            }}
          >
            <Link to="/admin" style={{ textDecoration: "none", color: "inherit" }}>
              Admin Login
            </Link>
          </span>
        </div>

        {/* Quick Links */}
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/our-doctors">Doctors</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/book-appointment">Book Appointment</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4>Contact</h4>
          <p>📍 Varanasi, Uttar Pradesh</p>
          <p>📞 +91 98765 43210</p>
          <p>✉️ citycare@clinic.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} City Care Clinic. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
