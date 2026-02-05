/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export default function MessageInput({ onSend }: any) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="flex p-4 bg-white border-t gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
        placeholder="Írj üzenetet..."
        className="flex-1 border rounded-lg p-3"
      />

      <button
        onClick={send}
        className="px-4 py-2 rounded-lg bg-blue-500 text-white"
      >
        Küldés
      </button>
    </div>
  );
}
