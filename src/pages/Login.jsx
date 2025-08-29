import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try { await login(email, password); nav("/dashboard"); }
    catch (err) { setError(err?.response?.data?.msg || "Login failed"); }
  };

  return (
    <div className="container">
      <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} className="card max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-400 mb-3">{error}</p>}
        <form onSubmit={onSubmit} className="space-y-3">
          <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="btn w-full">Login</button>
        </form>
        <p className="mt-3 text-sm text-white/70">New here? <Link className="underline" to="/register">Create an account</Link></p>
      </motion.div>
    </div>
  );
}
