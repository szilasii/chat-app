import { Key, useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function RoomSelector({
  currentRoom,
  onChange,
}: {
  currentRoom: string;
  onChange: (room: string) => void;
}) {
  const [rooms, setRooms] = useState([]);
  const token = localStorage.getItem("authToken");
  

  fetch("http://localhost:3000/rooms", {
    headers: {
      "x-access-token": `${token}`,
    },
  })
    .then((r) => r.json())
    .then((data) => {
      setRooms(data.rooms);
    });
  
    return (
    <div className="w-1/5 bg-white border-r p-4">
      <h2 className="text-xl font-bold mb-4">Chat szobák</h2>

      {rooms.map((r:{roomId: Key | null | undefined,name: string}) => (
        <div
          key={r.roomId}
          onClick={() => onChange(r.name)}
          className={`p-3 rounded cursor-pointer mb-2 capitalize
            ${r.name === currentRoom ? "bg-blue-100 font-semibold" : "hover:bg-gray-100"}`}
        >
          #{r.name}
        </div>
      ))}
    </div>
  );
}


