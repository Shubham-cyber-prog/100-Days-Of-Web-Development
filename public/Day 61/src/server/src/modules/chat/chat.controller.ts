import { Request, Response } from "express";
import asyncHandler from "@/shared/utils/asyncHandler";
import sendResponse from "@/shared/utils/sendResponse";
import { ChatService } from "./chat.service";
import { makeLogsService } from "../logs/logs.factory";

export class ChatController {
  private logsService = makeLogsService();
  constructor(private chatService: ChatService) {}

  getChat = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user!;

    const chat = await this.chatService.getChat(id);

    sendResponse(res, 200, {
      data: { chat },
      message: "Chat fetched successfully",
    });

    this.logsService.info("Chat fetched", {
      userId: user.id,
      chatId: id,
    });
  });

  getUserChats = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new Error("User not found");
    }

    const userId = req.user.id;
    console.log("userId => ", userId);
    const chats = await this.chatService.getUserChats(userId);
    console.log("chats => ", chats);

    sendResponse(res, 200, {
      data: { chats },
      message: "Chats fetched successfully",
    });

    this.logsService.info("Chats fetched by user", {
      userId,
      targetUserId: userId,
    });
  });

  getAllChats = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user!;
    const { status } = req.query;

    const chats = await this.chatService.getAllChats(
      status as "OPEN" | "RESOLVED"
    );

    sendResponse(res, 200, {
      data: { chats },
      message: "All chats fetched successfully",
    });

    this.logsService.info("All chats fetched", {
      userId: user.id,
    });
  });

  createChat = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new Error("User not found");
    }
    const userId = req.user.id;

    const newChat = await this.chatService.createChat(userId);

    sendResponse(res, 201, {
      data: { chat: newChat },
      message: "Chat created successfully",
    });

    this.logsService.info("Chat created", {
      userId,
    });
  });

  sendMessage = asyncHandler(async (req: Request, res: Response) => {
    const { chatId, content } = req.body;
    const user = req.user!;
    const file = req.file;
    console.log("file => ", file);

    const message = await this.chatService.sendMessage(
      chatId,
      content || null,
      user.id,
      file
    );

    sendResponse(res, 200, {
      data: { message },
      message: "Message sent successfully",
    });

    this.logsService.info("Message sent", {
      userId: user.id,
      chatId,
      type: message.type,
    });
  });

  updateChatStatus = asyncHandler(async (req: Request, res: Response) => {
    const { chatId } = req.params;
    const { status } = req.body;
    const user = req.user!;

    const updatedChat = await this.chatService.updateChatStatus(chatId, status);

    sendResponse(res, 200, {
      data: { chat: updatedChat },
      message: "Chat status updated successfully",
    });

    this.logsService.info("Chat status updated", {
      userId: user.id,
      chatId,
      status,
    });
  });
}
