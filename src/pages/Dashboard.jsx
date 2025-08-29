import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="container">
      <div className="card">
        <h2 className="text-2xl font-bold">Welcome, {user?.name || "Guest"}</h2>
        <p className="opacity-80">Role: <b>{user?.role || "N/A"}</b></p>
        <p className="mt-2">Use the navbar to create quizzes or join via link sent to your email.</p>
      </div>
    </div>
  );
}
