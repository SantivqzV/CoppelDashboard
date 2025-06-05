"use client";

import React, { useState, useEffect } from "react";
import { useFormContext } from "@/context/FormContext";
import { useRouter } from "next/navigation";
import  useAuth  from "@/hooks/useAuth"; // Assuming you have a custom hook for authentication

const Homepage = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const router = useRouter();
  const {login } = useAuth(); // Using custom hook for authentication

  const { isAuthenticated, setIsAuthenticated } = useFormContext();

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      const success = await login(Username, Password);
      if (success) {
        setIsAuthenticated(true);
        alert("Login successful!");
        router.push("/home");
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      alert("Login failed");
      console.error(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log("User is authenticated");
      router.push("/home"); // Redirect to the dashboard page if already authenticated
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="bg-primary-foreground p-4 rounded-lg items-center text-center">
        <h1 className="text-3xl font-semibold mb-5">Coppel PTL</h1>
        <div className="p-2">
          <input 
            type="text"
            placeholder="Username"
            className="border p-2 rounded w-full mb-2"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded w-full mb-2"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Button */}
          <div className="flex justify-center">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full hover:cursor-pointer"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
          {/* Create Account & Forget Password */}
          <div className="mt-4 justify-around flex">
            <a href="/signup" className="text-sm text-blue-500 hover:underline hover:cursor-pointer">
              Create Account
            </a>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
