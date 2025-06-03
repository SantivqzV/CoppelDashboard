"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/auth/AuthProvider";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { signup, login } = useAuth();
    
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }
    setLoading(true);
    try {
        await signup(name, username, email, password, "#000000", 0);
        await login(username, password);
        alert("Signup successful! Redirecting to Home Page...");
        router.push("/home");
    } catch (error: any) {
        alert(error?.response?.data?.detail || "Signup failed.");
    }
    setLoading(false);
    };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="bg-primary-foreground p-4 rounded-lg items-center text-center">
        <h1 className="text-3xl font-semibold mb-5">Sign Up</h1>
        <form className="p-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded w-full mb-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username"
            className="border p-2 rounded w-full mb-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded w-full mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded w-full mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="border p-2 rounded w-full mb-4"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full hover:cursor-pointer"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>
        <div className="mt-4 flex justify-center">
          <a
            className="text-sm text-blue-500 hover:underline hover:cursor-pointer"
            onClick={() => router.push("/")}
          >
            Already have an account? Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;