// src/components/chat/utils/messageFormatter.ts

/**
 * Formats a timestamp into a user-friendly string based on how recent it is.
 */
export const formatMessageTime = (timestamp: string): string => {
  const messageDate = new Date(timestamp);
  const now = new Date();

  const isSameDay = (a: Date, b: Date): boolean =>
    a.toDateString() === b.toDateString();

  const formatTime = (date: Date): string =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Today
  if (isSameDay(messageDate, now)) {
    return formatTime(messageDate);
  }

  // Yesterday
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (isSameDay(messageDate, yesterday)) {
    return `Yesterday, ${formatTime(messageDate)}`;
  }

  // Same year (e.g. Apr 15, 08:30 PM)
  if (messageDate.getFullYear() === now.getFullYear()) {
    return messageDate.toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Different year (e.g. Apr 15, 2023, 08:30 PM)
  return messageDate.toLocaleString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Formats the message content.
 * (Extend this to add emoji parsing, link detection, etc.)
 */
export const formatMessageContent = (content: string): string => {
  return content;
};
