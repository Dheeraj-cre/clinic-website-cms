import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to City Care Clinic</h1>
        <p>Your health is our priority. Trusted doctors, modern facilities.</p>

        <div className="hero-actions">
          <Link to="/our-doctors" className="btn primary">
            View Doctors
          </Link>
          <Link to="/book-appointment" className="btn secondary">
            Book Appointment
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="feature-card">
          <h3>Qualified Doctors</h3>
          <p>Experienced specialists across departments.</p>
        </div>

        <div className="feature-card">
          <h3>Modern Services</h3>
          <p>Advanced diagnostics & patient care.</p>
        </div>

        <div className="feature-card">
          <h3>Easy Appointments</h3>
          <p>Quick and simple booking process.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
