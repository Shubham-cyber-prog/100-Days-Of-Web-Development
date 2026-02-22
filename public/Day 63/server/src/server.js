const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const { Server } = require('socket.io');

const connectDB = require('./config/db');
const roomsRouter = require('./routes/rooms');
const signaling = require('./sockets/signaling');

dotenv.config();
const app = express();
const server = http.createServer(app);

app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json());

app.use('/api/rooms', roomsRouter);

const io = new Server(server, {
  cors: { origin: process.env.CLIENT_ORIGIN, methods: ['GET', 'POST'] }
});
signaling(io);

connectDB(process.env.MONGO_URI)
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`Server running on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection failed', err);
    process.exit(1);
  });