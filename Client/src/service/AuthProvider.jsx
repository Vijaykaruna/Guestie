import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/axios.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(null);

  // const checkAuth = async () => {
  //   try {
  //     const res = await api.get("/auth/profile");
  //     setUser(res.data);
  //     setAuthorized(true);
  //   } catch {
  //     setUser(null);
  //     setAuthorized(false);
  //   }
  // };

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setAuthorized(false);
        return;
      }

      const res = await api.get("/auth/profile");

      setUser(res.data);
      setAuthorized(true);
    } catch {
      setUser(null);
      setAuthorized(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, authorized, setUser, setAuthorized, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
