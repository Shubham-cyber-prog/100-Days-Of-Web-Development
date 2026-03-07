"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Check, Mic, Image as ImageIcon, Send } from "lucide-react";
import Image from "next/image";

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSendMessage: (file?: File, content?: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  message,
  setMessage,
  onSendMessage,
  disabled,
}) => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioChunks = useRef<Blob[]>([]);

  // Cleanup preview URL when file changes
  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      audioChunks.current = [];

      recorder.ondataavailable = (e) => {
        audioChunks.current.push(e.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/mp3" });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Failed to start recording:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
      setMediaRecorder(null);
    }
  };

  const cancelMedia = () => {
    setSelectedFile(null);
    setAudioBlob(null);
    setPreviewUrl(null);
    if (mediaRecorder) {
      stopRecording();
    }
  };

  const confirmSend = () => {
    if (selectedFile) {
      onSendMessage(selectedFile);
      setSelectedFile(null);
      setPreviewUrl(null);
    } else if (audioBlob) {
      const file = new File([audioBlob], "voice_message.mp3", {
        type: "audio/mp3",
      });
      onSendMessage(file);
      setAudioBlob(null);
    } else if (message.trim()) {
      onSendMessage(undefined, message);
      setMessage("");
    }
  };

  return (
    <div className="p-4 bg-white border-t border-gray-200 shadow-sm">
      {(selectedFile || audioBlob) && (
        <div className="mb-3 p-3 bg-gray-50 rounded-lg flex items-center space-x-3">
          {selectedFile && previewUrl && (
            <Image
              src={previewUrl}
              alt="Preview"
              width={400}
              height={200}
              className="w-16 h-16 object-cover rounded-lg"
            />
          )}
          {audioBlob && (
            <audio
              controls
              src={URL.createObjectURL(audioBlob)}
              className="h-10"
            />
          )}
          <div className="flex space-x-2">
            <button
              onClick={cancelMedia}
              className="p-2 text-red-500 hover:text-red-600"
            >
              <X size={20} />
            </button>
            <button
              onClick={confirmSend}
              className="p-2 text-green-500 hover:text-green-600"
            >
              <Check size={20} />
            </button>
          </div>
        </div>
      )}
      <div className="flex items-center space-x-2">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
          // disabled={disabled || recording || selectedFile || audioBlob}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          // disabled={disabled || recording || selectedFile || audioBlob}
          className="p-2 text-gray-500 hover:text-blue-600 disabled:text-gray-300"
        >
          <ImageIcon size={24} />
        </button>
        <button
          onClick={recording ? stopRecording : startRecording}
          // disabled={disabled || selectedFile || audioBlob}
          className={`p-2 ${
            recording
              ? "text-red-500 animate-pulse"
              : "text-gray-500 hover:text-blue-600"
          } disabled:text-gray-300`}
        >
          <Mic size={24} />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          // disabled={disabled || selectedFile || audioBlob}
        />
        <button
          onClick={confirmSend}
          disabled={
            disabled ||
            (!message.trim() && !selectedFile && !audioBlob) ||
            recording
          }
          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-300 transition-all"
        >
          <Send size={24} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
