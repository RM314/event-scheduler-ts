import { createContext, useContext, useState, type ReactNode } from "react";
import { loginUser } from "../api/authApi";
import type { LoginUserResult } from "../api/authApi"; // falls du den Typ exportierst

type LoginResult = {
  ok: boolean;
  message: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    Boolean(localStorage.getItem("token"))
  );

  async function login(email: string, password: string): Promise<LoginResult> {
    const result: LoginUserResult = await loginUser(email, password);

    if (result.ok) {
      // durch Union-Type weiß TS hier: result.token existiert
      localStorage.setItem("token", result.token);
      setIsAuthenticated(true);
    }

    return { ok: result.ok, message: result.message };
  }

  function logout(): void {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};