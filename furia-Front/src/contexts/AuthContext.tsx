import { createContext, ReactNode, useEffect, useState } from "react";
import { AuthAPI } from "../services/AuthService";
import { UserDTO } from "../dtos/userDTO";

type AuthContextDataProps = {
  user: UserDTO | null;
  signIn: (data: { email: string; password: string }) => Promise<void>;
  signOut: () => void;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  async function signIn(data: {
    email: string;
    password: string;
  }): Promise<void> {
    try {
      const result = await AuthAPI.signIn(data);
      if (result.status === 200) {
        setUser(result.data);
        localStorage.setItem("userData", JSON.stringify(result.data));
      } else {
        throw new Error("Credenciais inválidas");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw new Error("Falha ao tentar fazer login");
    }
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem("userData");
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
