import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function RoomCreated() {
  const navigate = useNavigate();
  const location = useLocation();
  const { code, name, displayName } = location.state || {};

  return (
    <div style={{ padding: 24 }}>
      <h2>✅ Successfully created a room</h2>
      <p>Your room name: <strong>{name}</strong></p>
      <p>Your room ID: <strong>{code}</strong></p>

      <button className='join'
        onClick={() => navigate('/room', { state: { roomCode: code, displayName } })}
      >
        Join
      </button>
    </div>
  );
}