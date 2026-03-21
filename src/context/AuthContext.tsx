import { createContext, useContext, useState, type ReactNode } from "react";
import type { AuthContextType } from "../types/auth.types";
import type { User } from "../types/user.types";

const MOCK_USERS = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@gmail.com",
    password: "admin123",
    role: "admin" as const,
  },
  {
    id: "2",
    name: "Normal User",
    email: "user@gmail.com",
    password: "user123",
    role: "user" as const,
  },
];

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password,
    );

    if (found) {
      const { password: _, ...userWhitoutPassword } = found;
      setUser(userWhitoutPassword);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
