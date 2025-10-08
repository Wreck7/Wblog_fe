// src/components/Comments.jsx
import { useState } from "react";
import { motion } from "framer-motion";

export default function Comments() {
  const [comments, setComments] = useState([
    { id: 1, author: "Alice", text: "This article blew my mind! 🚀" },
    { id: 2, author: "Bob", text: "Retro vibes + tech = 🔥🔥🔥" },
    { id: 3, author: "Charlie", text: "Waiting for the sequel 😎" },
  ]);
  const [input, setInput] = useState("");

  const addComment = () => {
    if (!input.trim()) return;
    setComments([
      ...comments,
      { id: comments.length + 1, author: "You", text: input },
    ]);
    setInput("");
  };

  const colors = [
    "bg-[#FFFACD]", // light yellow sticky
    "bg-[#E0FFFF]", // light cyan
    "bg-[#FFDAB9]", // peach
    "bg-[#E6E6FA]", // lavender
  ];

  return (
    <section className="mt-12">
      <h3 className="text-2xl font-extrabold uppercase tracking-widest mb-6">
        Reader Comments
      </h3>

      {/* Comments list */}
      <div className="space-y-6">
        {comments.map((c, i) => (
          <motion.div
            key={c.id}
            whileHover={{ rotate: Math.random() * 2 - 1, scale: 1.02 }}
            className={`p-4 border-2 border-stone-800 shadow-[4px_4px_0px_#000] ${
              colors[i % colors.length]
            } font-mono`}
          >
            <p className="text-sm leading-relaxed">{c.text}</p>
            <div className="mt-2 text-xs font-bold text-stone-800">
              — {c.author}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input box */}
      <div className="mt-8 flex gap-3">
        <input
          type="text"
          placeholder="Leave a retro thought..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border-2 border-stone-800 p-3 font-mono shadow-[3px_3px_0px_#000] focus:outline-none"
        />
        <button
          onClick={addComment}
          className="px-5 py-3 border-2 border-stone-800 bg-[#FDF6E3] font-bold uppercase text-xs tracking-wider shadow-[3px_3px_0px_#000] hover:-translate-y-1 hover:translate-x-1 transition-transform"
        >
          Post
        </button>
      </div>
    </section>
  );
}
