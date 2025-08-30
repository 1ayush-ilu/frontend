import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import api from "../api";

// ✅ Safely read API URL from env, fallback to localhost if missing
const API_URL = process.env.REACT_APP_API || "http://localhost:5000/api";

// ✅ Socket base (remove `/api` if present)
const SOCKET_URL = API_URL.replace("/api", "");

const socket = io(SOCKET_URL, { transports: ["websocket"] });

export default function Leaderboard() {
  const { id } = useParams();
  const [rows, setRows] = useState([]);

  const load = async () => {
    try {
      const { data } = await api.get(`/${id}/leaderboard`);
      setRows(data);
    } catch (err) {
      console.error("Failed to load leaderboard:", err);
    }
  };

  useEffect(() => {
    load();

    socket.emit("quiz:join", id);
    const handler = (p) => {
      if (String(p.quizId) === String(id)) load();
    };

    socket.on("leaderboard:update", handler);
    return () => socket.off("leaderboard:update", handler);
  }, [id]);

  return (
    <div className="container">
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
        <table className="table">
          <thead>
            <tr>
              <th className="th">Rank</th>
              <th className="th">Name</th>
              <th className="th">Score</th>
              <th className="th">Time</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.rank}>
                <td className="td">{r.rank}</td>
                <td className="td">{r.name || "Anonymous"}</td>
                <td className="td">{r.score}</td>
                <td className="td">
                  {r.submittedAt
                    ? new Date(r.submittedAt).toLocaleTimeString()
                    : "--"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <a
          className="btn mt-4 inline-block"
          href={`${API_URL}/quiz/${id}/export`}
          target="_blank"
          rel="noreferrer"
        >
          Export CSV
        </a>
      </div>
    </div>
  );
}
