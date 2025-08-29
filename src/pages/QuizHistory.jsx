import React, { useEffect, useState } from "react";
import api from "../api";

export default function QuizHistory() {
  const [quizzes, setQuizzes] = useState([]);
  useEffect(() => { api.get("/quiz").then(({data}) => setQuizzes(data)); }, []);
  return (
    <div className="container">
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Quiz History</h2>
        <table className="table">
          <thead><tr><th className="th">Title</th><th className="th">Created At</th></tr></thead>
          <tbody>
            {quizzes.map(q => <tr key={q._id}><td className="td">{q.title}</td><td className="td">{new Date(q.createdAt).toLocaleString()}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
