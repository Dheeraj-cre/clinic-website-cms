const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const serviceRoutes = require("./routes/serviceRoutes");
const statsRoutes = require("./routes/statsRoutes");
dotenv.config();

const connectDB = require("./config/db");
connectDB();

const authRoutes = require("./routes/authRoutes"); //  MUST EXIST
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const path = require("path");
const galleryRoutes = require("./routes/galleryRoutes");
const app = express();

app.use(cors());
app.use(express.json());

// ✅ VERY IMPORTANT: mount auth routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/gallery", galleryRoutes);
// test root
app.get("/", (req, res) => {
  res.send("Clinic CMS Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
