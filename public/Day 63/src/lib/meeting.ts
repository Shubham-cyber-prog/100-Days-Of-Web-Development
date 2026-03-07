export function generateRoomId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const segments = [3, 4, 3];
  return segments
    .map((len) =>
      Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
    )
    .join('-');
}

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
  isLocal?: boolean;
}

export interface Participant {
  id: string;
  name: string;
  stream?: MediaStream | null;
  isLocal?: boolean;
  isMuted?: boolean;
  isCameraOff?: boolean;
}
