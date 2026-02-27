import { useState, useEffect, useRef } from "react";
import { Socket } from "socket.io-client";

interface WebRTCCallProps {
  chatId: string;
  socket: Socket | null;
}

export const useWebRTCCall = ({ chatId, socket }: WebRTCCallProps) => {
  const [callStatus, setCallStatus] = useState<
    "idle" | "calling" | "in-call" | "ended"
  >("idle");

  // * Refs (useRef) are used to store objects that shouldn’t change when the component re-renders.
  // ? If we stored peerConnection in state, React would recreate it every time the component updates, breaking the call. Refs keep these objects stable.

  /* This ref is for webRTC connection (manages the direct connection between two browsers 
  We store it in a ref because we need it to persist across renders otherwise react will recreate it
  */
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  /**
   * This ref holds the stream for the local user. media stream: stream for audio (or video) from the device.
   *
   */
  const localStreamRef = useRef<MediaStream | null>(null);

  /**
   * This ref holds the audio stream for the other person
   *
   */
  const remoteStreamRef = useRef<MediaStream | null>(null);

  /**
   * This is ref on the <audio> element. we attach the remote stream ref to this element to play the other person's voice.
   */

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startCall = async () => {
    if (!socket) return;

    try {
      setCallStatus("calling");
      // * This is how we access the local media stream of the user, and then store it in a ref.
      localStreamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      // * Create remote stream. prepare an empty stream to hold the other person's audio
      remoteStreamRef.current = new MediaStream();

      // * Setup peer connection
      peerConnectionRef.current = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }], // Use Google's STUN server to help teh browsers find each other
      });

      // * Add my microphone audio to the connection
      localStreamRef.current.getTracks().forEach((track) => {
        peerConnectionRef.current?.addTrack(track, localStreamRef.current!);
      });

      // * Listen for incoming tracks. Listens for the other person's audio and it adds it to the remote stream
      peerConnectionRef.current.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
          remoteStreamRef.current?.addTrack(track);
        });
      };

      /**
       *  An ICE (Interactive Connectivity Establishment) candidate is a potential network
       * path (IP address + port + transport protocol)
       * that a WebRTC peer can use to establish a direct connection with another peer.
       * Two devices are trynna connect, each one tries to gather all possible ways they could connect.
       */

      // * sends network information (ice candidates) to the other person via socket io
      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("iceCandidate", {
            chatId,
            candidate: event.candidate,
            to: null,
          });
        }
      };

      // * Monitor connection state
      peerConnectionRef.current.onconnectionstatechange = () => {
        if (peerConnectionRef.current?.connectionState === "connected") {
          setCallStatus("in-call");
        }
      };

      // * Create a proposal to connect to the other person
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);
      socket.emit("callOffer", { chatId, offer }); // Send the offer to the other person via socket io
    } catch (error) {
      console.error("Failed to start call:", error);
      endCall();
    }
  };

  /**
   * 
   * 
   * WebRTC uses Session Description Protocol (SDP) to describe how peers want to communicate — media formats, codecs, transport info, etc.
    Local Description: What you want to offer or accept.
    Remote Description: What the other peer is offering or accepting.

   * 
   */

  /** How sockets are working :
   * we emit events (offer, answer, iceCandidate) from frontend A
   * Receive them on teh backend (Socket io setup to listen for those events)
   * Then the backend forward them to the frontend B
   * 
   * [Frontend A] --emit--> [Socket.IO Server] --emit--> [Frontend B]
                          ^                               |
                |-- listens for "offer", "ice" -↓

   */

  const answerCall = async (offer: RTCSessionDescriptionInit, from: string) => {
    if (!socket) return;

    try {
      setCallStatus("calling");
      localStreamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      remoteStreamRef.current = new MediaStream();

      peerConnectionRef.current = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      localStreamRef.current.getTracks().forEach((track) => {
        peerConnectionRef.current?.addTrack(track, localStreamRef.current!);
      });

      peerConnectionRef.current.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
          remoteStreamRef.current?.addTrack(track);
        });
      };

      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("iceCandidate", {
            chatId,
            candidate: event.candidate,
            to: from,
          });
        }
      };

      peerConnectionRef.current.onconnectionstatechange = () => {
        if (peerConnectionRef.current?.connectionState === "connected") {
          setCallStatus("in-call");
        }
      };

      // set the remote description with the offer
      await peerConnectionRef.current.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);
      socket.emit("callAnswer", { chatId, answer, to: from });
    } catch (error) {
      console.error("Failed to answer call:", error);
      endCall();
    }
  };

  const endCall = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }
    if (remoteStreamRef.current) {
      remoteStreamRef.current = null;
    }
    if (socket) {
      socket.emit("endCall", { chatId });
    }
    setCallStatus("ended");
    setTimeout(() => setCallStatus("idle"), 1000);
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("callOffer", ({ offer, from }) => {
      if (callStatus === "idle") {
        answerCall(offer, from);
      }
    });

    socket.on("callAnswer", ({ answer }) => {
      if (peerConnectionRef.current && callStatus === "calling") {
        // set the remote description with the answer
        peerConnectionRef.current.setRemoteDescription(
          new RTCSessionDescription(answer)
        );
      }
    });

    socket.on("iceCandidate", ({ candidate }) => {
      if (peerConnectionRef.current && candidate) {
        peerConnectionRef.current.addIceCandidate(
          new RTCIceCandidate(candidate)
        );
      }
    });

    socket.on("callEnded", () => {
      endCall();
    });

    return () => {
      socket.off("callOffer");
      socket.off("callAnswer");
      socket.off("iceCandidate");
      socket.off("callEnded");
    };
  }, [socket, callStatus]);

  // Attach remote stream to audio element
  useEffect(() => {
    if (audioRef.current && remoteStreamRef.current) {
      audioRef.current.srcObject = remoteStreamRef.current;
    }
  }, []);

  // Attach local and remote streams to video elements
  useEffect(() => {
    if (localVideoRef.current && localStreamRef.current) {
      localVideoRef.current.srcObject = localStreamRef.current;
    }
    if (remoteVideoRef.current && remoteStreamRef.current) {
      remoteVideoRef.current.srcObject = remoteStreamRef.current;
    }
  }, []);

  return {
    callStatus,
    startCall,
    endCall,
    audioRef,
    localVideoRef,
    remoteVideoRef,
  };
};
