import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name:"", email:"", password:"", role:"student" });
  const [error, setError] = useState("");
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try { await register(form); nav("/dashboard"); }
    catch (err) { setError(err?.response?.data?.msg || "Register failed"); }
  };

  return (
    <div className="container">
      <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} className="card max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-400 mb-3">{error}</p>}
        <form onSubmit={onSubmit} className="space-y-3">
          <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
          <input className="input" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
          <input className="input" type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
          <div className="flex gap-4 text-sm">
            <label className="flex items-center gap-2">
              <input type="radio" name="role" checked={form.role==="student"} onChange={()=>setForm({...form, role:"student"})}/>
              Student
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="role" checked={form.role==="host"} onChange={()=>setForm({...form, role:"host"})}/>
              Host
            </label>
          </div>
          <button className="btn w-full">Create Account</button>
        </form>
        <p className="mt-3 text-sm text-white/70">Have an account? <Link className="underline" to="/login">Login</Link></p>
      </motion.div>
    </div>
  );
}
