import "./DashboardCard.css";

const DashboardCard = ({ title, value }) => {
  // Icon mapping based on title
  const getIcon = (title) => {
    switch (title) {
      case "Doctors":
        return "👨‍⚕️";
      case "Services":
        return "🏥";
      case "Appointments":
        return "📅";
      default:
        return "📊";
    }
  };

  return (
    <div className="dashboard-card">
      <h3 className="card-title">{title}</h3>
      <p className="card-value">{value}</p>
      <div className="card-icon">{getIcon(title)}</div>
    </div>
  );
};

export default DashboardCard;