/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import RoomSelector from "./RoomSelector";
import ChatWindow from "./ChatWindow";

export default function ChatLayout() {
  const [messages, setMessages] = useState<any[]>([]);
  const [room, setRoom] = useState("general");
  const socketRef = useRef<WebSocket | null>(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:3000");

    socketRef.current.onopen = () => {
      socketRef.current?.send(
        JSON.stringify({
          type: "auth",
          token,
          room,
        })
      );
    };

    socketRef.current.onmessage = (msg) => {
      const data = JSON.parse(msg.data);

      if (data.type === "message" && data.room.name === room) {
        setMessages((prev) => [...prev, data]);
      }
    };

    return () => socketRef.current?.close();
  }, [room]);

  const sendMessage = (text: string) => {
    socketRef.current?.send(
      JSON.stringify({
        type: "message",
        text,
        room,
        token,
        timestamp: new Date().toISOString(),
      })
    );

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text,
        fromUser: true,
        room,
        username: "Én",
        avatar: null,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  return (
    <div className="flex h-full">
      <RoomSelector currentRoom={room} onChange={setRoom} />

      <ChatWindow
        messages={messages}
        room={room}
        sendMessage={sendMessage}
      />
    </div>
  );
}
