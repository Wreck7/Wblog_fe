// src/components/PostCard.jsx
import { motion } from "framer-motion";

export default function PostCard({ title, excerpt }) {
  return (
    <motion.article
      whileHover={{ scale: 1.03, rotate: -1 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
      className="relative border-4 border-stone-800 bg-[#FAF3E0] shadow-[6px_6px_0px_#000] p-6 font-serif cursor-pointer group"
    >
      {/* Newspaper headline banner */}
      <div className="absolute -top-3 left-4 bg-stone-800 text-[#FAF3E0] px-3 py-1 text-xs uppercase font-bold tracking-widest shadow-md">
        Breaking
      </div>

      {/* Title */}
      <h4 className="text-2xl font-extrabold uppercase mb-3 tracking-wide group-hover:underline">
        {title}
      </h4>

      {/* Excerpt */}
      <p className="text-stone-700 text-sm leading-relaxed mb-4">
        {excerpt}
      </p>

      {/* Retro “read more” button */}
      <button className="mt-2 px-4 py-2 border-2 border-stone-800 bg-[#FDF6E3] font-semibold uppercase text-xs tracking-wider shadow-[3px_3px_0px_#000] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
        Read More →
      </button>

      {/* Old paper overlay for retro feel */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-20 pointer-events-none mix-blend-multiply"></div>
    </motion.article>
  );
}
