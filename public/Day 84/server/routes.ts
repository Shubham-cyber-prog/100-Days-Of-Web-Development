import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertWaitlistSchema } from "@shared/schema";
import { ZodError } from "zod";
import { WebSocketServer, WebSocket } from "ws";
import { nanoid } from "nanoid";

// Data structures for the chat system
interface ChatMessage {
  id: string;
  roomId: string;
  username: string;
  content: string;
  timestamp: number;
}

interface ChatRoom {
  id: string;
  name: string;
  interests: string[];
  messages: ChatMessage[];
  participants: string[]; // Stores usernames
}

interface ChatClient {
  id: string;
  username: string;
  socket: WebSocket;
  roomId: string | null;
}

// Memory storage for chat
const chatRooms: ChatRoom[] = [
  {
    id: "tech-enthusiasts",
    name: "Tech Enthusiasts",
    interests: ["Technology", "Programming", "AI"],
    messages: [],
    participants: []
  },
  {
    id: "business-network",
    name: "Business Network",
    interests: ["Business", "Entrepreneurship", "Marketing"],
    messages: [],
    participants: []
  },
  {
    id: "creative-minds",
    name: "Creative Minds",
    interests: ["Design", "Arts", "Media"],
    messages: [],
    participants: []
  },
  {
    id: "health-wellness",
    name: "Health & Wellness",
    interests: ["Healthcare", "Fitness", "Wellness"],
    messages: [],
    participants: []
  }
];

const clients: Map<string, ChatClient> = new Map();

// Helper function to log messages (copy from vite.ts or create a simple one)
function log(message: string, source: string = "chat-server") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}


export async function registerRoutes(app: Express) {
  app.post("/api/waitlist", async (req, res) => {
    try {
      const data = insertWaitlistSchema.parse(req.body);

      const isRegistered = await storage.isEmailRegistered(data.email);
      if (isRegistered) {
        return res.status(400).json({
          message: "This email is already registered for the waitlist"
        });
      }

      const entry = await storage.createWaitlistEntry(data);
      res.status(201).json(entry);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Invalid input data",
          errors: error.errors
        });
      }
      log(`Error in /api/waitlist: ${error instanceof Error ? error.message : String(error)}`, "error");
      res.status(500).json({ message: "Failed to join waitlist" });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  // Create WebSocket server
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  wss.on('connection', (socket: WebSocket) => {
    const clientId = nanoid();
    // Store the socket directly with the client info
    clients.set(clientId, {
      id: clientId,
      username: '', // Username set upon joining a room
      socket,
      roomId: null
    });
    log(`Client connected: ${clientId}`);

    socket.on('message', (message: Buffer) => {
      try {
        const data = JSON.parse(message.toString());
        log(`Received message from ${clientId}: ${JSON.stringify(data)}`);
        handleWebSocketMessage(clientId, data);
      } catch (error) {
        log(`Error parsing message from ${clientId}: ${error instanceof Error ? error.message : String(error)}`, "error");
      }
    });

    socket.on('close', () => {
      log(`Client disconnected: ${clientId}`);
      const client = clients.get(clientId);
      if (client && client.roomId && client.username) { // Check username too
        log(`Client ${client.username} leaving room ${client.roomId} due to disconnect.`);
        // Call leaveRoom using the stored clientId and roomId
        leaveRoom(client.id, client.roomId);
        // Client object's roomId is cleared within leaveRoom
      } else {
        log(`Client ${clientId} disconnected but was not in a room or had no username.`);
      }
      clients.delete(clientId); // Remove client from the map
      log(`Remaining clients: ${clients.size}`);
    });

    socket.on('error', (error) => { // Add error handling
      log(`WebSocket error for client ${clientId}: ${error.message}`, "error");
      const client = clients.get(clientId);
       if (client && client.roomId && client.username) {
         log(`Attempting cleanup for ${client.username} in room ${client.roomId} due to error.`);
         leaveRoom(client.id, client.roomId);
       }
       clients.delete(clientId); // Ensure client is removed on error
       log(`Client ${clientId} removed due to error. Remaining clients: ${clients.size}`);
    });
  });

  return httpServer;
}

// WebSocket message handler
function handleWebSocketMessage(clientId: string, data: any) {
  const client = clients.get(clientId);
  if (!client) {
    log(`Client ${clientId} not found.`, "error");
    return;
  }

  switch (data.type) {
    case 'getRooms':
      sendRoomsList(client);
      break;
    case 'joinRoom':
      if (data.roomId && data.username) {
        joinRoom(clientId, data.roomId, data.username);
      } else {
         log(`Invalid joinRoom request from ${clientId}: Missing roomId or username`, "warning");
      }
      break;
    case 'sendMessage':
      if (client.roomId && data.content) {
        const message: ChatMessage = {
          id: nanoid(),
          roomId: client.roomId,
          username: client.username, // Use username stored on server
          content: String(data.content).trim(), // Trim content
          timestamp: Date.now()
        };
        // Basic check to prevent empty messages
        if(message.content.length > 0) {
           addMessageToRoom(client.roomId, message);
        } else {
           log(`Empty message attempt from ${client.username} in room ${client.roomId}`, "warning");
        }

      } else {
         log(`SendMessage failed for ${clientId}: Not in a room or empty content`, "warning");
      }
      break;
    case 'createRoom':
       if (data.name && data.interests && Array.isArray(data.interests)) {
         const newRoomId = createRoom(data.name, data.interests);
         log(`Room created: ${data.name} (ID: ${newRoomId}) by client ${clientId}`);
         broadcastRoomsList(); // Notify all clients about the new room
       } else {
          log(`Invalid createRoom request from ${clientId}: Missing name or interests`, "warning");
       }
      break;
      
    // --- START ADDITION ---
    case 'ping':
      // This case handles the heartbeat message from the client.
      // We don't need to do anything, just receiving it is enough
      // to keep the WebSocket connection from being closed for inactivity.
      break;
    // --- END ADDITION ---

    default:
        log(`Unknown message type received from ${clientId}: ${data.type}`, "warning");
  }
}

// Helper functions for chat

// Sends the current list of rooms (with participant counts) to a specific client
function sendRoomsList(client: ChatClient) {
  const roomsData = chatRooms.map(room => ({
    id: room.id,
    name: room.name,
    interests: room.interests,
    participants: room.participants.length // Send the count
  }));

  if (client.socket.readyState === WebSocket.OPEN) {
    try {
      client.socket.send(JSON.stringify({
        type: 'rooms',
        rooms: roomsData
      }));
       log(`Sent rooms list to client ${client.id}`);
    } catch (error) {
       log(`Error sending rooms list to ${client.id}: ${error instanceof Error ? error.message : String(error)}`, "error");
    }
  } else {
     log(`Could not send rooms list to ${client.id}: Socket not open`, "warning");
  }
}

// Sends the updated room list to ALL connected clients
function broadcastRoomsList() {
  log(`Broadcasting updated rooms list to ${clients.size} clients.`);
  clients.forEach(client => {
    sendRoomsList(client);
  });
}

// Handles a client joining a specific room
function joinRoom(clientId: string, roomId: string, username: string) {
  const client = clients.get(clientId);
  const room = chatRooms.find(r => r.id === roomId);

  if (!client || !room) {
    log(`Join room failed: Client ${clientId} or Room ${roomId} not found`, "error");
    return;
  }

  // Set/Update client username
  client.username = username;
  log(`Client ${clientId} set username to ${username}`);

  // If client was in another room, ensure they leave it first
  if (client.roomId && client.roomId !== roomId) {
    log(`Client ${username} moving from room ${client.roomId} to ${roomId}`);
    leaveRoom(clientId, client.roomId); // This already updates client.roomId to null
  }

  // Add client to the new room
  client.roomId = roomId; // Set the new room ID
  if (!room.participants.includes(username)) {
    room.participants.push(username);
    log(`${username} added to participants for room ${roomId}. Participants: ${room.participants.join(', ')}`);
  } else {
     log(`${username} already in participants list for room ${roomId}`);
  }


  // Send full room details (including messages) to the joining client
  if (client.socket.readyState === WebSocket.OPEN) {
     try {
       client.socket.send(JSON.stringify({
         type: 'roomJoined',
         room: { // Send the full room object structure expected by client
           id: room.id,
           name: room.name,
           interests: room.interests,
           messages: room.messages,
           participants: room.participants // Send the list of usernames
         }
       }));
       log(`Sent roomJoined details for ${roomId} to ${username}`);
     } catch (error) {
       log(`Error sending roomJoined details to ${username}: ${error instanceof Error ? error.message : String(error)}`, "error");
     }
  } else {
     log(`Could not send roomJoined details to ${username}: Socket not open`, "warning");
  }

  // Notify everyone in the room (including the new joiner) about the updated participant list
  broadcastParticipantsUpdate(roomId);

  // Broadcast updated room list (with counts) to everyone connected to the server
  broadcastRoomsList();
}

// Handles a client leaving a specific room
function leaveRoom(clientId: string, roomId: string) {
  const client = clients.get(clientId);
  const room = chatRooms.find(r => r.id === roomId);

  // Use the username stored in the client map for removal
  const usernameToRemove = client?.username;

  if (!client || !room || !usernameToRemove) {
    log(`LeaveRoom failed: Client ${clientId} (Username: ${usernameToRemove}), Room ${roomId} invalid state`, "warning");
    // Still try to clear client's room ID if possible
    if(client) client.roomId = null;
    return;
  }

  log(`Attempting to remove ${usernameToRemove} from room ${roomId}`);

  // Remove participant username from room's participant list
  const initialLength = room.participants.length;
  room.participants = room.participants.filter(p => p !== usernameToRemove); // More robust removal

  if (room.participants.length < initialLength) {
     log(`Removed ${usernameToRemove} from room ${roomId}. New participants: ${room.participants.join(', ')}`);
  } else {
     log(`${usernameToRemove} not found in participants list for room ${roomId}. Participants: ${room.participants.join(', ')}`);
  }


  // Clear the room ID from the client's state in the map
  client.roomId = null;
  log(`Cleared roomId for client ${clientId} (${usernameToRemove})`);

  // Notify remaining participants in that specific room
  broadcastParticipantsUpdate(roomId);

  // Broadcast updated room list (with counts) to everyone connected to the server
  broadcastRoomsList();
}

// Sends the updated participant list for a specific room to all clients currently in that room
function broadcastParticipantsUpdate(roomId: string) {
  const room = chatRooms.find(r => r.id === roomId);
  if (!room) {
    log(`Cannot broadcast participants update: Room ${roomId} not found`, "error");
    return;
  }

  const participantsList = room.participants;
  log(`Broadcasting participants update for room ${roomId}: ${participantsList.join(', ')}`);

  clients.forEach(client => {
    // Only send to clients currently in this specific room
    if (client.roomId === roomId && client.socket.readyState === WebSocket.OPEN) {
      try {
        client.socket.send(JSON.stringify({
          type: 'participantsUpdate',
          roomId: roomId, // Include roomId for client-side check
          participants: participantsList // Send the array of usernames
        }));
      } catch (error) {
         log(`Error broadcasting participants update to ${client.id}: ${error instanceof Error ? error.message : String(error)}`, "error");
      }
    }
  });
}

// Adds a message to a room and broadcasts it to participants
function addMessageToRoom(roomId: string, message: ChatMessage) {
  const room = chatRooms.find(r => r.id === roomId);
  if (!room) {
    log(`Cannot add message: Room ${roomId} not found`, "error");
    return;
  }

  // Add message to room history
  room.messages.push(message);
  log(`Message added to room ${roomId} by ${message.username}: "${message.content}"`);

  // Limit message history (e.s., keep last 100 messages)
  if (room.messages.length > 100) {
    room.messages.shift();
    log(`Trimmed message history for room ${roomId}`);
  }

  // Broadcast the new message to all participants currently in the room
  clients.forEach(client => {
    if (client.roomId === roomId && client.socket.readyState === WebSocket.OPEN) {
       try {
         client.socket.send(JSON.stringify({
           type: 'message',
           message // Send the full message object
         }));
       } catch (error) {
         log(`Error sending message to client ${client.id}: ${error instanceof Error ? error.message : String(error)}`, "error");
       }

    }
  });
}

// Creates a new chat room
function createRoom(name: string, interests: string[]): string {
  const roomId = nanoid(10); // Use a shorter ID maybe
  const newRoom: ChatRoom = {
    id: roomId,
    name: name.trim(),
    interests: Array.isArray(interests) ? interests : [],
    messages: [],
    participants: []
  };
  chatRooms.push(newRoom);
  log(`Created new room: ${newRoom.name} (ID: ${roomId}) with interests: ${newRoom.interests.join(', ')}`);
  return roomId;
}