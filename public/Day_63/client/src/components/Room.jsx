import React, { useEffect, useRef, useState } from 'react';
import socket from '../socket';
import VideoGrid from './VideoGrid';

export default function Room({ roomCode, displayName, onLeave }) {
  const localVideoRef = useRef(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const peersRef = useRef(new Map());

  // Audio/Video toggle state
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);

  // Get local media stream
  useEffect(() => {
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
      } catch (err) {
        console.error('Failed to get media stream:', err);
      }
    })();
  }, []);

  // Assign stream to video element once both are ready
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  // Handle signaling and peer connections
  useEffect(() => {
    if (!localStream) return;

    socket.emit('join-room', { roomCode, displayName });

    socket.on('existing-participants', async (participants) => {
      for (const p of participants) {
        const pc = createPeer(p.socketId);
        localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit('webrtc-offer', { to: p.socketId, sdp: offer });
      }
    });

    socket.on('webrtc-offer', async ({ from, sdp }) => {
      const pc = createPeer(from);
      localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
      await pc.setRemoteDescription(new RTCSessionDescription(sdp));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit('webrtc-answer', { to: from, sdp: answer });
    });

    socket.on('webrtc-answer', async ({ from, sdp }) => {
      const pc = peersRef.current.get(from);
      if (pc) await pc.setRemoteDescription(new RTCSessionDescription(sdp));
    });

    socket.on('webrtc-ice-candidate', async ({ from, candidate }) => {
      const pc = peersRef.current.get(from);
      if (pc && candidate) await pc.addIceCandidate(new RTCIceCandidate(candidate));
    });

    socket.on('user-left', ({ socketId }) => {
      const pc = peersRef.current.get(socketId);
      if (pc) {
        pc.close();
        peersRef.current.delete(socketId);
        setRemoteStreams(prev => prev.filter(s => s.id !== socketId));
      }
    });

    return () => {
      socket.emit('leave-room', { roomCode });
      socket.removeAllListeners();
      peersRef.current.forEach(pc => pc.close());
      peersRef.current.clear();
      setRemoteStreams([]);
      localStream.getTracks().forEach(track => track.stop());
    };
  }, [localStream, roomCode, displayName]);

  // Create peer connection
  function createPeer(peerId) {
    const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
    peersRef.current.set(peerId, pc);

    pc.onicecandidate = (e) => {
      if (e.candidate) socket.emit('webrtc-ice-candidate', { to: peerId, candidate: e.candidate });
    };

    pc.ontrack = (e) => {
      const stream = e.streams[0];
      setRemoteStreams(prev => {
        const exists = prev.some(s => s.id === peerId);
        return exists ? prev : [...prev, { id: peerId, stream }];
      });
    };

    return pc;
  }

  // Toggle audio
  function toggleAudio() {
    if (!localStream) return;
    localStream.getAudioTracks().forEach(track => {
      track.enabled = !track.enabled;
      setIsAudioOn(track.enabled);
    });
  }

  // Toggle video
  function toggleVideo() {
    if (!localStream) return;
    localStream.getVideoTracks().forEach(track => {
      track.enabled = !track.enabled;
      setIsVideoOn(track.enabled);
    });
  }

  return (
    <div style={{ padding: 16 }}>
      <div style={{ marginBottom: 12 }}>
        <button className="leave" onClick={onLeave}>Leave</button>
        <button className='audioBtn' onClick={toggleAudio}>
          {isAudioOn ? 'Mute' : 'Unmute'}
        </button>
        <button className='videoBtn' onClick={toggleVideo}>
          {isVideoOn ? 'Video Off' : 'Video On'}
        </button>
      </div>
      <VideoGrid localRef={localVideoRef} remoteStreams={remoteStreams} />
    </div>
  );
}