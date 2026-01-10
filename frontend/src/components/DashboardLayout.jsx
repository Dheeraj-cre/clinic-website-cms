import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./DashboardLayout.css";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="layout-wrapper">
      <Sidebar />

      <div className="main-area">
        <header className="top-header">
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </header>

        <main className="page-content">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
