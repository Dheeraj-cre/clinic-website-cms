import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background"></div>
        <div className="hero-decorations">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">Welcome to City Care Clinic</h1>
          <p className="hero-subtitle">
            Your health is our priority. Trusted doctors, modern facilities, and
            compassionate care for you and your family.
          </p>
          <div className="hero-actions">
            <Link to="/our-doctors" className="btn primary">
              <span>View Doctors</span>
            </Link>
            <Link to="/book-appointment" className="btn secondary">
              <span>Book Appointment</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h3>Qualified Doctors</h3>
          <p>
            Experienced specialists across multiple departments ready to provide
            expert medical care.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
          <h3>Modern Services</h3>
          <p>
            Advanced diagnostics and state-of-the-art medical equipment for
            accurate patient care.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <h3>Easy Appointments</h3>
          <p>
            Quick and simple online booking process. Schedule your visit in just
            a few clicks.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <h2 className="section-title">Our Medical Services</h2>
        <p className="section-subtitle">
          Comprehensive healthcare services tailored for you and your family.
        </p>

        <div className="services-grid">
          <div className="service-card">
            <h3>General Medicine</h3>
            <p>
              Diagnosis and treatment for common illnesses with personalized care.
            </p>
          </div>

          <div className="service-card">
            <h3>Pediatrics</h3>
            <p>
              Complete healthcare services for infants, children, and adolescents.
            </p>
          </div>

          <div className="service-card">
            <h3>Dental Care</h3>
            <p>
              Advanced dental treatments for healthy teeth and confident smiles.
            </p>
          </div>

          <div className="service-card">
            <h3>Diagnostics</h3>
            <p>
              Accurate lab tests and reports using modern diagnostic equipment.
            </p>
          </div>
        </div>

        <Link to="/services" className="btn primary services-btn">
          <span>View All Services</span>
        </Link>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2 className="section-title">What Our Patients Say</h2>

        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>
              "Excellent doctors and friendly staff. The appointment process was
              smooth and hassle-free."
            </p>
            <h4>— Rahul Sharma</h4>
            <span>⭐⭐⭐⭐⭐</span>
          </div>

          <div className="testimonial-card">
            <p>
              "Very clean clinic and professional service. I felt well taken care of
              throughout my visit."
            </p>
            <h4>— Anjali Verma</h4>
            <span>⭐⭐⭐⭐⭐</span>
          </div>

          <div className="testimonial-card">
            <p>
              "Highly recommend City Care Clinic. Doctors are knowledgeable and very
              supportive."
            </p>
            <h4>— Amit Singh</h4>
            <span>⭐⭐⭐⭐⭐</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;