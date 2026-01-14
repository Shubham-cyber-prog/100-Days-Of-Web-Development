import express from "express";
import { Server as SocketIOServer } from "socket.io";
import { configureV1Routes } from "./v1";

export const configureRoutes = (io: SocketIOServer) => {
  const router = express.Router();

  router.use("/v1", configureV1Routes(io));

  // ** V2 ROUTES HERE **

  return router;
};
