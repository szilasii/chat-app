/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import CreateRoomModal from "../components/CreateRoomModal";
import ChatLayout from "../components/chatLayout";

export default function MessagesPage() {
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);

  const openModal = () => setShowCreateRoom(true);
  const closeModal = () => setShowCreateRoom(false);

  const handleRoomCreated = (room: any) => {
    setRooms(prev => [...prev, room]);
  };

  return (
    <><div className="p-4">
          <button
              onClick={openModal}
              className="px-4 py-2 bg-blue-600 text-white rounded"
          >
              + Új szoba
          </button>

          {showCreateRoom && (
              <CreateRoomModal
                  members={users}
                  onClose={closeModal}
                  onRoomCreated={handleRoomCreated} />
          )}

          {/* A szobák listája */}
          <div className="mt-4">
              {rooms.map(r => (
                  <div key={r.roomId} className="p-2 border rounded mb-2">
                      {r.name}
                  </div>
              ))}
          </div>
      </div><div className="h-screen bg-gray-100">
              <ChatLayout />
          </div></>
  );
  
}



