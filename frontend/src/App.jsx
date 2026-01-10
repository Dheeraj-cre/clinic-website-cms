import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* Admin Pages */
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/Doctors";
import Services from "./pages/Services";
import Appointments from "./pages/Appointments";
import Gallery from "./pages/Gallery";

/* User Pages */
import UserLayout from "./layouts/UserLayout";
import Home from "./pages/Home";
import OurDoctors from "./pages/OurDoctors";
import PublicServices from "./pages/PublicServices";
import PublicGallery from "./pages/PublicGallery";
import BookAppointment from "./pages/BookAppointment";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌐 USER WEBSITE (Public with Layout) */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/our-doctors" element={<OurDoctors />} />
          <Route path="/services" element={<PublicServices />} />
          <Route path="/gallery" element={<PublicGallery />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
        </Route>

        {/* 🔐 ADMIN CMS */}
        <Route path="/admin" element={<AdminLogin />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/doctors"
          element={
            <ProtectedRoute>
              <Doctors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/services"
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/appointments"
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/gallery"
          element={
            <ProtectedRoute>
              <Gallery />
            </ProtectedRoute>
          }
        />

        {/* 🚫 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
