import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import appointmentRoutes from "./routes/appointmentRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect("mongodb://localhost:27017/myhealth").then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Routes
app.use("/api/appointments", appointmentRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));