import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // ================= LOGIN =================
  const login = async (email, password) => {
    const res = await api.post("/users/login", { email, password });

    const { token, user } = res.data;
    console.log(token)
    console.log(user)
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
/*
{"token": "jdhjgjfghklfnbgilgjn"}

*/
    setUser(user);
  };

  // ================= LOGOUT =================
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  // ================= INIT =================
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
