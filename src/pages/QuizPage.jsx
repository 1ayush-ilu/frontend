import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import api from "../api";
import Timer from "../components/Timer";

const socket = io(process.env.REACT_APP_API.replace("/api",""), { transports: ["websocket"] });

export default function QuizPage() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [started, setStarted] = useState(false); // ✅ added
  const nav = useNavigate();

  useEffect(() => {
    api.get(`/quiz/${id}`).then(({ data }) => {
      setQuiz(data);
      setAnswers(new Array(data.questions.length).fill(null));
    });
    socket.emit("quiz:join", id);
  }, [id]);

  const submit = async () => {
    try {
      await api.post(`/${id}/submit`, { answers });
      setSubmitted(true);
      nav(`/leaderboard/${id}`);
    } catch (e) {
      alert(e?.response?.data?.msg || "Submit failed");
    }
  };

  if (!quiz) {
    return (
      <div className="container">
        <div className="card">Loading...</div>
      </div>
    );
  }

  // ✅ Start screen
  if (!started) {
    return (
      <div className="container">
        <div className="card space-y-4 text-center">
          <h2 className="text-2xl font-bold">{quiz.title}</h2>
          <p className="text-lg">{quiz.prompt || "Get ready to start the quiz!"}</p>
          <button className="btn" onClick={() => setStarted(true)}>Start Quiz</button>
        </div>
      </div>
    );
  }

  // ✅ Show quiz after Start button clicked
  return (
    <div className="container">
      <div className="card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{quiz.title}</h2>
          <Timer seconds={120} onEnd={() => !submitted && submit()} />
        </div>
        {quiz.questions.map((q, idx) => (
          <div key={idx} className="card">
            <p className="font-semibold mb-2"><b>Q{idx + 1}.</b> {q.question}</p>
            <div className="grid md:grid-cols-2 gap-2">
              {q.options.map((op, i) => (
                <label
                  key={i}
                  className={`cursor-pointer rounded-2xl px-3 py-2 border ${
                    answers[idx] === i ? "border-accent bg-white/5" : "border-white/10 hover:bg-white/5"
                  }`}
                >
                  <input
                    className="mr-2"
                    type="radio"
                    name={`q${idx}`}
                    checked={answers[idx] === i}
                    onChange={() =>
                      setAnswers((a) => {
                        const b = [...a];
                        b[idx] = i;
                        return b;
                      })
                    }
                  />
                  {op}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button className="btn" onClick={submit} disabled={submitted}>Submit</button>
      </div>
    </div>
  );
}
