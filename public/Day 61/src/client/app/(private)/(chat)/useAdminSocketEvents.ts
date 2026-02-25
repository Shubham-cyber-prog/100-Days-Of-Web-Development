import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export const useAdminSocketEvents = (
  onChatCreated: () => void,
  onChatStatusUpdated: () => void
) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Get server URL based on environment
    const serverUrl =
      process.env.NODE_ENV === "production"
        ? "https://egwinch.com"
        : "http://localhost:5000";

    // Initialize socket connection
    socketRef.current = io(serverUrl);

    // Join admin room
    socketRef.current.emit("joinAdmin");

    // Listen for admin events
    socketRef.current.on("chatCreated", (newChat) => {
      console.log("New chat created:", newChat);
      onChatCreated();
    });

    socketRef.current.on("chatStatusUpdated", (updatedChat) => {
      console.log("Chat status updated:", updatedChat);
      onChatStatusUpdated();
    });

    // Clean up on component unmount
    return () => {
      socketRef.current?.off("chatCreated");
      socketRef.current?.off("chatStatusUpdated");
      socketRef.current?.disconnect();
    };
  }, [onChatCreated, onChatStatusUpdated]);

  return socketRef.current;
};
