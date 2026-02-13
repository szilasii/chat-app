/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import CreateRoomModal from "../components/CreateRoomModal";
import ChatLayout from "../components/ChatLayout";
import Navbar from "../components/navbar";

export default function MessagesPage() {
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);

  const openModal = () => setShowCreateRoom(true);
  const closeModal = () => setShowCreateRoom(false);
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${token}`,
          }
        });

        const data = await res.json();
        setUsers(data.users); // API-tól függően lehet data.users
      } catch (err) {
        console.error("User fetch error:", err);
      }
    };

    fetchUsers();

  }, [token]);




  useEffect(() => {
    fetch("http://localhost:3000/rooms", {
      headers: {
        "x-access-token": `${token}`,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        setRooms(data.rooms);
      })
      .catch((err) => {
        console.error("Rooms fetch error:", err);
      });
  }, [token]);

  const handleRoomCreated = (room: any) => {
    setRooms(prev => [...prev, room]);
  };

  return (
    <>

      <Navbar />


      {showCreateRoom && (
        <CreateRoomModal
          members={users}
          onClose={closeModal}
          onRoomCreated={handleRoomCreated}
        />
      )}
      <div className="p-4 flex justify-between items-center">
          <button
            onClick={openModal}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            + Új szoba
          </button>
        </div>
      <div className="h-screen bg-gray-100">
        <ChatLayout rooms={rooms} />
        
      </div>
    </>
  );
}