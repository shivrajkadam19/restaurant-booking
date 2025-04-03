"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import axios from "axios";
const BASE_URL = "http://localhost:3000";

type User = {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call

      // For demo purposes, accept any email with a password of "password"
      const success = await axios.post(
        `/api/auth/signin`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (success.status === 201) {
        console.log("responce", success.data.user);
        const data = success.data.user;
        setUser({
          _id: data._id,
          name: data.name,
          email: data.email,
          avatar: "/images/placeholder.png",
        });
        localStorage.setItem("user", JSON.stringify(data));
        setIsLoading(false);
        return true;
      }

      setIsLoading(false);
      return false;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call

      const success = await axios.post(
        `/api/auth/signup`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (success.status === 201) {
        console.log("responce", success.data.user);
        const data = success.data.user;
        setUser({
          _id: data._id,
          name: data.name,
          email: data.email,
          avatar: "/images/placeholder.png",
        });
        localStorage.setItem("user", JSON.stringify(data));
        setIsLoading(false);
        return true;
      }

      return false;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
