import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AdminContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType>({ isAdmin: false, login: () => false, logout: () => {} });

export const useAdmin = () => useContext(AdminContext);

const ADMIN_KEY = "ankita_admin_auth";
const ADMIN_PASS = "ankita2026";

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(sessionStorage.getItem(ADMIN_KEY) === "true");
  }, []);

  const login = (password: string) => {
    if (password === ADMIN_PASS) {
      sessionStorage.setItem(ADMIN_KEY, "true");
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(ADMIN_KEY);
    setIsAdmin(false);
  };

  return <AdminContext.Provider value={{ isAdmin, login, logout }}>{children}</AdminContext.Provider>;
};
