const Room = require('../models/Room');

function signaling(io) {
  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    /**
     * Explicitly create a room
     */
    socket.on('create-room', async ({ roomCode, name }) => {
      const code = roomCode.trim();

      try {
        const existing = await Room.findOne({ code });
        if (existing) {
          socket.emit('room-error', 'Room already exists');
          return;
        }

        const room = await Room.create({
          code,
          name: name || 'Untitled Room',
          participants: []
        });

        socket.emit('room-created', { code: room.code, name: room.name });
      } catch (err) {
        console.error('Error creating room:', err);
        socket.emit('room-error', 'Could not create room');
      }
    });

    /**
     * Join an existing room
     */
    socket.on('join-room', async ({ roomCode, displayName }) => {
      const code = roomCode.trim();

      try {
        const room = await Room.findOne({ code });
        if (!room) {
          socket.emit('room-error', 'Room does not exist. Please create it first.');
          return;
        }

        // Join the socket.io room
        socket.join(code);

        // Add participant if not already present
        if (!room.participants.some(p => p.socketId === socket.id)) {
          room.participants.push({
            socketId: socket.id,
            displayName: displayName || 'Guest'
          });
          await room.save();
        }

        // Notify others in the room
        socket.to(code).emit('user-joined', {
          socketId: socket.id,
          displayName: displayName || 'Guest'
        });

        // Send existing participants to the new user
        socket.emit(
          'existing-participants',
          room.participants.filter(p => p.socketId !== socket.id)
        );
      } catch (err) {
        console.error('Error joining room:', err);
        socket.emit('room-error', 'Could not join room');
      }
    });

    /**
     * WebRTC signaling events
     */
    socket.on('webrtc-offer', ({ to, sdp }) => {
      io.to(to).emit('webrtc-offer', { from: socket.id, sdp });
    });

    socket.on('webrtc-answer', ({ to, sdp }) => {
      io.to(to).emit('webrtc-answer', { from: socket.id, sdp });
    });

    socket.on('webrtc-ice-candidate', ({ to, candidate }) => {
      io.to(to).emit('webrtc-ice-candidate', { from: socket.id, candidate });
    });

    /**
     * Leave a room
     */
    socket.on('leave-room', async ({ roomCode }) => {
      socket.leave(roomCode);
      try {
        await Room.findOneAndUpdate(
          { code: roomCode },
          { $pull: { participants: { socketId: socket.id } } }
        );
        socket.to(roomCode).emit('user-left', { socketId: socket.id });
      } catch (err) {
        console.error('Error leaving room:', err);
      }
    });

    /**
     * Handle disconnect
     */
    socket.on('disconnect', async () => {
      const rooms = Array.from(socket.rooms).filter(r => r !== socket.id);
      for (const roomCode of rooms) {
        try {
          await Room.findOneAndUpdate(
            { code: roomCode },
            { $pull: { participants: { socketId: socket.id } } }
          );
          socket.to(roomCode).emit('user-left', { socketId: socket.id });
        } catch (err) {
          console.error('Error on disconnect:', err);
        }
      }
    });
  });
}

module.exports = signaling;