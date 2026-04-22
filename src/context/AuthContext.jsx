import { createContext, useState, useCallback } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    setIsLoggingOut(false);
  };

  const logout = useCallback(() => {
    setIsLoggingOut(true);
    localStorage.removeItem("token");
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout, isLoggingOut }}>
      {children}
    </AuthContext.Provider>
  );
};
