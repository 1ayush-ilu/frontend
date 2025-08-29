import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import api from "../api";

const socket = io(process.env.REACT_APP_API.replace("/api",""), { transports: ["websocket"] });

export default function Leaderboard() {
  const { id } = useParams();
  const [rows, setRows] = useState([]);

  const load = async () => {
    const { data } = await api.get(`/${id}/leaderboard`);
    setRows(data);
  };

  useEffect(() => {
    load();
    socket.emit("quiz:join", id);
    const handler = (p) => { if (String(p.quizId) === String(id)) load(); };
    socket.on("leaderboard:update", handler);
    return () => socket.off("leaderboard:update", handler);
  }, [id]);

  return (
    <div className="container">
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
        <table className="table">
          <thead><tr><th className="th">Rank</th><th className="th">Name</th><th className="th">Score</th><th className="th">Time</th></tr></thead>
          <tbody>
            {rows.map(r => <tr key={r.rank}><td className="td">{r.rank}</td><td className="td">{r.name}</td><td className="td">{r.score}</td><td className="td">{new Date(r.submittedAt).toLocaleTimeString()}</td></tr>)}
          </tbody>
        </table>
        <a className="btn mt-4 inline-block" href={`${process.env.REACT_APP_API}/quiz/${id}/export`} target="_blank" rel="noreferrer">Export CSV</a>
      </div>
    </div>
  );
}
