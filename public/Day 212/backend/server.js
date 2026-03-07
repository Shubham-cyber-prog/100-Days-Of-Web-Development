import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes.js";
import deviceRoutes from "./routes/deviceRoutes.js";
import Device from "./models/Device.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use("/api/auth", authRoutes);
app.use("/api/devices", deviceRoutes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("toggleDevice", async (id) => {
    const device = await Device.findById(id);
    device.status = !device.status;
    device.powerUsage = Math.random() * 100;
    device.temperature = 20 + Math.random() * 8;
    await device.save();
    io.emit("deviceUpdated", device);
  });
});

server.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT)
);