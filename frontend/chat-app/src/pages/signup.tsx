import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/card";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { motion } from "framer-motion";

export default function SignupPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Kérlek töltsd ki az összes kötelező mezőt!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    if (avatar) formData.append("avatar", avatar);

    try {
      const res = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        body: formData, // fontos!
      });

      const data = await res.json();

      if (res.status === 201 || res.status === 200) {
        // sikeres regisztráció
        navigate("/login");
      } else {
        setError(data.error || "Hiba történt a regisztráció során.");
      }
    } catch (err) {
      console.error(err);
      setError("Hálózati hiba történt!");
    }
  };

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAvatar(file);
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
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
              Csatlakozz hozzánk ✨
            </h1>

            {error && (
              <div className="text-red-600 bg-red-100 px-4 py-2 rounded mb-4 w-full text-center">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSignup}
              className="flex flex-col items-center w-full space-y-5"
            >
              {/* Név */}
              <Input
                placeholder="Teljes név"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-center bg-white/60 border-white/40"
              />

              {/* Email */}
              <Input
                type="email"
                placeholder="Email cím"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-center bg-white/60 border-white/40"
              />

              {/* Jelszó */}
              <Input
                type="password"
                placeholder="Jelszó"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-center bg-white/60 border-white/40"
              />

              {/* Avatar */}
              <div className="w-full flex flex-col items-center">
                {avatarPreview && (
                  <img
                    src={avatarPreview}
                    className="w-24 h-24 rounded-full object-cover mb-2 shadow-md"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatar}
                  className="text-white"
                />
                <p className="text-xs text-white/70 mt-1">Avatar (opcionális)</p>
              </div>

              {/* Regisztráció gomb */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full"
              >
                <Button
                  type="submit"
                  className="w-full py-2 text-lg font-semibold rounded-xl"
                >
                  Regisztráció
                </Button>
              </motion.div>
            </form>

            {/* Login link */}
            <p className="mt-4 text-white/90 text-sm">
              Már van fiókod?{" "}
              <span
                className="underline cursor-pointer"
                onClick={() => navigate("/")}
              >
                Lépj be!
              </span>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
