import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";

export function MessagesPage() {
const navigate = useNavigate();


const logout = () => {
localStorage.removeItem("authToken");
navigate("/");
};


return (
<div className="p-6 max-w-2xl mx-auto">
<motion.h1
className="text-4xl font-bold mb-4"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
>
Üzenetek
</motion.h1>
<p className="text-lg mb-6 bg-white p-4 rounded-xl shadow">
🎉 Sikeresen bejelentkeztél! Itt jelennek meg az üzeneteid.
</p>
<Button onClick={logout} variant="destructive">
Kijelentkezés
</Button>
</div>
);
}


