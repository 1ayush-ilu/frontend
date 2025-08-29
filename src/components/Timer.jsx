import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Timer({ seconds, onEnd }) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    const t = setInterval(() => {
      setLeft(s => {
        if (s <= 1) { clearInterval(t); onEnd?.(); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [onEnd]);
  return (
    <AnimatePresence>
      <motion.div initial={{scale:.95, opacity:0}} animate={{scale:1, opacity:1}} exit={{opacity:0}} className="card text-center">
        <div className="text-sm opacity-70">Time Left</div>
        <div className="text-2xl font-bold">{left}s</div>
      </motion.div>
    </AnimatePresence>
  );
}
