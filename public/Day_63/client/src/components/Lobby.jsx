import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
export default function Lobby({ onJoin }) {
  const [roomCode, setRoomCode] = useState('');
  const [displayName, setDisplayName] = useState('');
  const navigate = useNavigate();

  async function handleCreateRoom() {
    try {
      const res = await fetch('http://localhost:5000/api/rooms/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'New Room' })
      });
      const data = await res.json();
      if (data.code) {
        // Navigate to RoomCreated page with room info
        navigate('/created', { state: { code: data.code, name: data.name, displayName } });
      } else {
        alert('Failed to create room');
      }
    } catch (err) {
      console.error('Create room error:', err);
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Join a room</h2>
      <input
        className='roomCode'
        placeholder="Room code"
        value={roomCode}
        onChange={e => setRoomCode(e.target.value)}
      />
      <input
        className='yourName'
        placeholder="Your name"
        value={displayName}
        onChange={e => setDisplayName(e.target.value)}
      />
      <button
      className='join'
        onClick={() => onJoin(roomCode, displayName)}
        disabled={!roomCode || !displayName}
      >
        Join
      </button>

      <hr style={{ margin: '20px 0' }} />

      <button className='createRoom' onClick={handleCreateRoom}>Create New Room</button>
    </div>
  );
}