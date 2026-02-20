/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

export default function ChatWindow({ messages, room, sendMessage }: any) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col flex-1">
      <div className="p-4 border-b bg-white text-xl font-semibold">
        #{room.name} szoba
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-100">
        {messages.map((msg: any) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}

        <div ref={bottomRef}></div>
      </div>

      <MessageInput onSend={sendMessage} />
    </div>
  );
}
