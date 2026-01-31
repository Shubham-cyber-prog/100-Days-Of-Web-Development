import { Server as SocketIOServer } from "socket.io";
import { ChatController } from "./chat.controller";
import { ChatRepository } from "./chat.repository";
import { ChatService } from "./chat.service";

export const makeChatController = (io: SocketIOServer) => {
  const repo = new ChatRepository();
  const service = new ChatService(repo, io);
  const controller = new ChatController(service);

  return controller;
};
