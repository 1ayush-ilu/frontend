import React, { useEffect, useState } from "react";
import api from "../api";
import { motion } from "framer-motion";

export default function HostDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  useEffect(() => {
    api.get("/quiz").then(({data}) => setQuizzes(data));
  }, []);
  return (
    <div className="container">
      <motion.div initial={{opacity:0}} animate={{opacity:1}} className="card">
        <h2 className="text-2xl font-bold mb-4">Your Quizzes</h2>
        <table className="table">
          <thead><tr><th className="th">Title</th><th className="th">Created</th></tr></thead>
          <tbody>
            {quizzes.map(q => <tr key={q._id}><td className="td">{q.title}</td><td className="td">{new Date(q.createdAt).toLocaleString()}</td></tr>)}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
