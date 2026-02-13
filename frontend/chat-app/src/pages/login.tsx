import { useState } from "react";
import {

    useNavigate,
} from "react-router-dom";
import { Card, CardContent } from "../components/card";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { motion } from "framer-motion";


// --- Login Page ---
export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // hibák megjelenítéséhez
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Ellenőrzés, hogy nincs üres mező
        if (!email || !password) {
            setError("Kérlek töltsd ki az összes mezőt!");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/user/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (res.status === 200) {
                const data = await res.json();
                const token = data.token;
                // Token mentése localStorage-be
                alert("fdgsfdgs")
                localStorage.setItem("authToken", token);
                // Átirányítás messages oldalra
                navigate("/messages");
            } else if (res.status === 401) {
                const data = await res.json();
                setError(data.error || "Nem megfelelő felhasználónév vagy jelszó!");
            } else if (res.status === 404) {
                const data = await res.json();
                setError(data.error || "Nem megfelelően megadott adatok!");
            } else if (res.status === 400) {
                const data = await res.json();
                setError(data.error || "Hiba a titkos kulcsnál!");
            } else {
                setError("Ismeretlen hiba történt!");
            }
        } catch (err) {
            console.error(err);
            setError("Hálózati hiba történt!");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-linear-to-br from-blue-300 via-purple-300 to-pink-300 p-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Card className="w-96 backdrop-blur-xl bg-white/30 shadow-2xl border border-white/20 rounded-3xl">
                    <CardContent className="flex flex-col items-center p-8">
                        <h1 className="text-4xl font-extrabold text-white drop-shadow mb-6 text-center">
                            Üdv újra! 👋
                        </h1>
                        {error && (
                            <div className="text-red-600 bg-red-100 px-4 py-2 rounded mb-4 w-full text-center">
                                {error}
                            </div>
                        )}
                        <form
                            onSubmit={handleLogin}
                            className="flex flex-col items-center w-full space-y-5"
                        >
                            <Input
                                placeholder="Felhasználónév"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full text-center bg-white/60 border-white/40"
                            />

                            <Input
                                type="password"
                                placeholder="Jelszó"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full text-center bg-white/60 border-white/40"
                            />

                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                                <Button type="submit" className="w-full py-2 text-lg font-semibold rounded-xl">
                                    Belépés
                                </Button>
                            </motion.div>
                            <p className="mt-4 text-white/90 text-sm">
                                Még nincs fiókod?{" "}
                                <span
                                    className="underline cursor-pointer"
                                    onClick={() => navigate("/signup")}
                                >
                                    Regisztrálj!
                                </span>
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}