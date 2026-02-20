/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import RoomSelector from "./RoomSelector";
import ChatWindow from "./ChatWindow";

export default function ChatLayout(rooms: any[]) {
  const [messages, setMessages] = useState<any[]>([]);
  const [room, setRoom] = useState({roomId:1, name:"General"});
  const socketRef = useRef<WebSocket | null>(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    socketRef.current = new WebSocket(`ws://localhost:8080?token=${token}`);
    socketRef.current.onopen = () => {
    };

    socketRef.current.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      console.log(msg.data)

      if (data.type === "message" && data.room.roomId === room.roomId) {
        setMessages((prev) => [...prev, data]);
      }
    };

    return () => socketRef.current?.close();
  }, [room, token]);

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
      <RoomSelector currentRoom={room.roomId} rooms = { rooms } onChange={setRoom} />

      <ChatWindow
        messages={messages}
        room={room}
        sendMessage={sendMessage}
      />
    </div>
  );
}
