/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";



interface CreateRoomModalProps {
  members: any,
  onClose: () => void;
  onRoomCreated: (room: any) => void;
}

export default function CreateRoomModal({
  members,
  onClose,
  onRoomCreated,
}: CreateRoomModalProps) {

  const [roomName, setRoomName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const token = localStorage.getItem("authToken");
  const toggleMember = (id: number) => {
    setSelectedMembers(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };


  const createRoom = async () => {
    if (!roomName.trim()) return alert("Add meg a szoba nevét!");

    const res = await fetch("http://localhost:3000/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${token}`,
      },
      body: JSON.stringify({
        name: roomName,
        members: selectedMembers,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      onRoomCreated(data.room);
      onClose();
    } else {
      alert(data.error || "Hiba történt!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">

        <h2 className="text-xl font-bold mb-4">Új szoba létrehozása</h2>

        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          placeholder="Szoba neve"
          value={roomName}
          onChange={e => setRoomName(e.target.value)}
        />

        <p className="font-semibold mb-2">Tagok:</p>

        <div className="max-h-40 overflow-auto border p-2 rounded">
          {members.map((m: any) => (
            <label key={m.userId} className="block">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedMembers.includes(m.userId)}
                onChange={() => toggleMember(m.userId)}
              />
              {m.name}
            </label>
          ))}
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-500 text-white rounded"
          >
            Mégse
          </button>

          <button
            onClick={createRoom}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Létrehozás
          </button>
        </div>

      </div>
    </div>
  );
}
