import { Key } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function RoomSelector({
  rooms,
  currentRoom,
  onChange,
}: {
  rooms:any;
  currentRoom: number;
  onChange: (room:any ) => void;
}) {
    return (
    <div className="w-1/5 bg-white border-r p-4">
      <h2 className="text-xl font-bold mb-4">Chat szobák</h2>
      {rooms.rooms.length === 0 ? 
      (
         <p className="text-gray-500 italic">Nincs egyetlen szoba sem</p>
      ): (
      
      rooms.rooms.map((r:{roomId: Key | null | undefined,name: string}) => (
        <div
          key={r.roomId}
          onClick={() => onChange(r)}
          className={`p-3 rounded cursor-pointer mb-2 capitalize
            ${r.roomId === currentRoom ? "bg-blue-100 font-semibold" : "hover:bg-gray-100"}`}
        >
          #{r.name}
        </div>
      )))}
     
    </div>
  );
}


