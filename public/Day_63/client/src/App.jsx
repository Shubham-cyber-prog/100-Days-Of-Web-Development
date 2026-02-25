import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Lobby from './components/Lobby';
import Room from './components/Room';
import RoomCreated from './components/roomCreated';

export default function App() {
  const [joined, setJoined] = useState(false);
  const [roomCode, setRoomCode] = useState('');
  const [displayName, setDisplayName] = useState('');

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Lobby
            onJoin={(code, name) => {
              setRoomCode(code);
              setDisplayName(name);
              setJoined(true);
            }}
          />
        }
      />
      <Route
        path="/room"
        element={
          joined ? (
            <Room
              roomCode={roomCode}
              displayName={displayName}
              onLeave={() => setJoined(false)}
            />
          ) : (
            <Lobby onJoin={(code, name) => {
              setRoomCode(code);
              setDisplayName(name);
              setJoined(true);
            }} />
          )
        }
      />
      <Route path="/created" element={<RoomCreated />} />
    </Routes>
  );
}