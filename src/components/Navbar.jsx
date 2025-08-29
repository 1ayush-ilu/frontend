import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <div className="nav">
      <div className="nav-inner">
        <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1,y:0}} className="flex items-center gap-2 mr-auto">
          <span className="text-xl font-extrabold bg-gradient-to-r from-accent to-accent2 text-transparent bg-clip-text">
            Quiz Conductor
          </span>
        </motion.div>
        <Link className="linkpill" to="/">Home</Link>
        {user?.role === "host" && <>
          <Link className="linkpill" to="/create">Create Quiz</Link>
          <Link className="linkpill" to="/history">Quiz History</Link>
        </>}
        {user && <Link className="linkpill" to="/dashboard">Dashboard</Link>}
        {!user ? <Link className="btn" to="/login">Login</Link> : <button className="linkpill" onClick={logout}>Logout</button>}
      </div>
    </div>
  );
}
