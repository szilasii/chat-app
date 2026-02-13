import { useNavigate } from "react-router-dom";

export default function Navbar() {
const navigate = useNavigate();
  const logout = () => {
   localStorage.removeItem("authToken");
  navigate("/");
  };

  return (
    <div className="w-full bg-white shadow-md px-6 py-3 flex justify-between items-center">
      
      {/* Bal oldal */}
      <div className="text-xl font-bold text-gray-800">
        Chat App
      </div>

      {/* Jobb oldal */}
      <button
        onClick={logout}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Kijelentkezés
      </button>
    </div>
  );
}
