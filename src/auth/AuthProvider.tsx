"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { encryptData, decryptData } from "@/lib/crypto";

interface AuthContextType {
  user: any;
  setUser: (user: any) => void;
  login: (identifier: string, password: string) => Promise<boolean>;
  signup: (
    name: string,
    username: string,
    email: string,
    password: string,
    color_hex?: string,
    color_index?: number
  ) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        const decryptedUser = decryptData(userCookie);
        setUser(decryptedUser);
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  const logout = () => {
    setUser(null);
    Cookies.remove("user");
  }

  const login = async (identifier: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post("https://server-zzcb.onrender.com/login", { identifier, password });

      if (response.data && response.data.success) {
        const Cookie_data = encryptData(response.data);
        setUser(response.data.user);
        Cookies.set("user", Cookie_data, { expires: 7, path: "/" });
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      console.error("Login error:", error);
      return false;
    }
  };

  // Basic signup function
  const signup = async (
    name: string,
    username: string,
    email: string,
    password: string,
    color_hex: string = "#000000",
    color_index: number = 0
  ) => {
    try {
      const response = await axios.post("https://server-zzcb.onrender.com/register-user", {
        name,
        username,
        email,
        password,
        color_hex,
        color_index,
      });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};