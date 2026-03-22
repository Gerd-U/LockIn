import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { AuthContextType } from "../types/auth.types";
import type { User } from "../types/user.types";
import LoadingScreen from "../components/ui/LoadingScreen";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password,
    );
    if (found) {
      const { password: _, ...userWithoutPassword } = found;
      setUser(userWithoutPassword);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context as AuthContextType;
}
