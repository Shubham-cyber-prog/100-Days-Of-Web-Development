import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export const useSocketConnection = (chatId: string) => {
  console.log("chatId to connect => ", chatId);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Get server URL based on environment
    const serverUrl =
      process.env.NODE_ENV === "production"
        ? "https://<domain>.com"
        : "http://localhost:5000";

    // Initialize socket connection
    socketRef.current = io(serverUrl);

    // Join specific chat room
    socketRef.current.emit("joinChat", chatId);

    // Clean up on component unmount
    return () => {
      socketRef.current?.disconnect();
    };
  }, [chatId]);

  return socketRef.current;
};
