import React, { useState } from "react";
import api from "../api";
import { motion } from "framer-motion";

export default function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [emails, setEmails] = useState("");
  const [created, setCreated] = useState(null);
  const [msg, setMsg] = useState("");

  // ✅ Create quiz
  const create = async () => {
    try {
      const { data } = await api.post("/quiz", { title, prompt });

      // ✅ Fix: some backends return { quiz: {...} }, others just {...}
      setCreated(data.quiz || data);

      console.log("Quiz created:", data.quiz || data); // Debug
    } catch (err) {
      console.error("Error creating quiz:", err);
    }
  };

  // ✅ Send invites
  const sendInvites = async () => {
    if (!created) return;
    try {
      console.log("Sending invites for quiz ID:", created._id); // Debug

      const arr = emails.split(",").map((s) => s.trim()).filter(Boolean);
      const { data } = await api.post(`/quiz/${created._id}/invite`, { emails: arr });

      setMsg(`Invites sent: ${data.sent}`);
    } catch (err) {
      console.error("Error sending invites:", err);
      setMsg("❌ Failed to send invites. Check server logs.");
    }
  };

  return (
    <div className="container">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="card"
      >
        <h2 className="text-2xl font-bold mb-4">Create Quiz</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Create Quiz Form */}
          <div className="space-y-3">
            <input
              className="input"
              placeholder="Quiz Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="input h-32"
              placeholder="Prompt or topics (comma-separated)"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button className="btn" onClick={create}>
              Generate & Create
            </button>
          </div>

          {/* Show Created Quiz + Invite Section */}
          {created && (
            <div className="space-y-3">
              <div className="card">
                <p className="text-lg">
                  🎉 <b>Quiz Created:</b> {created.title}
                </p>
                <p className="text-sm opacity-80">Share link:</p>
                <div className="input">
                  <a href={`${process.env.REACT_APP_CLIENT}/quiz/${created._id}`} target="_blank" rel="noreferrer">{`${process.env.REACT_APP_CLIENT}/quiz/${created._id}`}</a>
                </div>
              </div>

              <div className="card space-y-2">
                <h3 className="font-semibold">Send Email Invites</h3>
                <input
                  className="input"
                  placeholder="email1, email2, ..."
                  value={emails}
                  onChange={(e) => setEmails(e.target.value)}
                />
                <button className="btn" onClick={sendInvites}>
                  Send Invites
                </button>
                {msg && <p className="text-emerald-300">{msg}</p>}
              </div>
              <div className="flex gap-2 mt-2">
                <button className="btn" onClick={() => navigator.clipboard.writeText(`${process.env.REACT_APP_CLIENT}/quiz/${created._id}`)}>Copy link</button>
                <button className="btn" onClick={() => window.open(`${process.env.REACT_APP_CLIENT}/quiz/${created._id}`, "_blank")}>Open</button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
