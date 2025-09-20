
// src/components/PostCard.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function PostCard({
  id,
  title,
  excerpt,
  coverImage,
  author,
  authorImage,
  category,
}) {
  return (
    <motion.article
      whileHover={{ scale: 1.03, rotate: -1 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
      className="relative border-4 border-stone-800 bg-[#FAF3E0] shadow-[6px_6px_0px_#000] font-serif cursor-pointer group flex flex-col min-h-[400px]"
    >
      {/* Category badge (retro ribbon) */}
      <div className="absolute -top-3 left-4 bg-stone-800 text-[#FAF3E0] px-3 py-1 text-xs uppercase font-bold tracking-widest shadow-md">
        {category || "Breaking"}
      </div>

      {/* Cover Image */}
      {coverImage && (
        <img
          src={coverImage}
          alt={title}
          className="h-40 w-full object-cover border-b-4 border-stone-800"
        />
      )}

      {/* Content */}
      <div className="flex flex-col p-6 flex-grow">
        {/* Title */}
        <h4 className="text-2xl font-extrabold uppercase mb-3 tracking-wide group-hover:underline">
          {title}
        </h4>

        {/* Excerpt (clamped) */}
        <p className="text-stone-700 text-sm leading-relaxed mb-4 line-clamp-3">
          {excerpt}
        </p>

        {/* Footer row */}
        <div className="mt-auto flex items-center justify-between">
          {/* Author */}
          {author && (
            <div className="flex items-center gap-2">
              {authorImage && (
                <img
                  src={authorImage}
                  alt={author}
                  className="w-8 h-8 rounded-full border-2 border-stone-800 shadow-[2px_2px_0px_#000]"
                />
              )}
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                {author}
              </span>
            </div>
          )}

          {/* Read More */}
          <Link
            to={`/post/${id}`}
            className="px-3 py-1 border-2 border-stone-800 bg-[#FDF6E3] font-semibold uppercase text-xs tracking-wider shadow-[3px_3px_0px_#000] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
          >
            Read More →
          </Link>
        </div>
      </div>

      {/* Old paper overlay for retro feel */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-20 pointer-events-none mix-blend-multiply"></div>
    </motion.article>
  );
}
