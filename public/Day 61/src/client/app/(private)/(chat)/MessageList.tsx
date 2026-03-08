"use client";

import React, { useRef } from "react";
import MessageItem from "./MessageItem";

interface MessageListProps {
  messages: any[];
  currentUserId: string;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserId,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Group messages by date
  const groupedMessages = messages.reduce((groups: any, message: any) => {
    const date = new Date(message.createdAt).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
      {Object.entries(groupedMessages).map(
        ([date, dateMessages]: [string, any]) => (
          <div key={date} className="space-y-4">
            <div className="flex justify-center">
              <div className="bg-white text-gray-500 px-4 py-1 rounded-full text-sm shadow-sm">
                {date === new Date().toLocaleDateString()
                  ? "Today"
                  : date ===
                    new Date(Date.now() - 86400000).toLocaleDateString()
                  ? "Yesterday"
                  : date}
              </div>
            </div>
            {dateMessages.map((msg: any) => (
              <MessageItem
                key={msg.id}
                message={msg}
                isCurrentUser={msg?.sender?.id === currentUserId}
              />
            ))}
          </div>
        )
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
