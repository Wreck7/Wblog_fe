// src/pages/PostDetail.jsx
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Bookmark, Heart, Send } from "lucide-react";

// Example data (replace with API later)
const posts = [
  {
    id: 1,
    title: "The Rise of Retro Tech",
    content: `Back in the golden age of computing, aesthetics and utility collided.
    The chunky pixels, bold fonts, and tactile buttons shaped an era of tech
    that still inspires designers and developers today.`,
    author: "Vishwa Govula",
    date: "Aug 25, 2025",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200", // sample retro image
  },
  {
    id: 2,
    title: "Breaking: JavaScript Strikes Again",
    content: `From ES6 to async/await, JavaScript keeps evolving faster than anyone
    expected. But deep inside, callbacks still haunt the shadows...`,
    author: "Jane Doe",
    date: "Aug 20, 2025",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200", // another sample
  },
];

export default function PostDetail() {
  const { id } = useParams();
  const post = posts.find((p) => p.id === Number(id));

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(12); // dummy initial likes
  const [bookmarked, setBookmarked] = useState(false);

  // comments state
  const [comments, setComments] = useState([
    { id: 1, user: "RetroFan99", text: "This gives me so much nostalgia!" },
    {
      id: 2,
      user: "TechieGirl",
      text: "Love the design, waiting for part 2 👏",
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      { id: Date.now(), user: "You", text: newComment.trim() },
    ]);
    setNewComment("");
  };

  const handleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Post not found.
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen px-6 py-10 bg-[#FAF3E0] border-t-8 border-b-8 border-transparent font-serif relative"
    >
      {/* Overlay texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-30 mix-blend-multiply pointer-events-none"></div>

      <div className="relative max-w-3xl mx-auto border-4 border-stone-800 bg-[#FDF6E3] shadow-[10px_10px_0px_#000] p-10">
        {/* Author bar */}
        <div className="flex items-center justify-between border-b-2 border-stone-800 pb-3 mb-6">
          <div className="flex items-center gap-4 mb-6 border-2 border-stone-800 bg-[#FAF3E0] px-4 py-2 shadow-[4px_4px_0px_#000]">
            {/* Author image */}
            <img
              src="https://i.pravatar.cc/50" // Dummy avatar
              alt="Author"
              className="w-10 h-10 rounded-full border-2 border-stone-800 shadow-sm"
            />
            <div>
              <p className="font-bold text-stone-900">By {post.author}</p>
              <p className="text-xs text-stone-600">{post.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={handleLike}
              className="p-2 border-2 border-stone-800 shadow-[3px_3px_0px_#000] bg-[#FDF6E3] flex items-center gap-2"
            >
              <Heart
                className={`w-5 h-5 ${
                  liked ? "fill-red-600 text-red-600" : "text-stone-800"
                }`}
              />
              <span className="text-sm font-semibold">{likeCount}</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={() => setBookmarked(!bookmarked)}
              className="p-2 border-2 border-stone-800 shadow-[3px_3px_0px_#000] bg-[#FDF6E3]"
            >
              <Bookmark
                className={`w-5 h-5 ${
                  bookmarked
                    ? "fill-stone-800 text-stone-800"
                    : "text-stone-800"
                }`}
              />
            </motion.button>
          </div>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-extrabold uppercase mb-6 tracking-wider"
        >
          {post.title}
        </motion.h1>

        {/* Featured Image */}
        {post.image && (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            src={post.image}
            alt={post.title}
            className="w-full max-h-[400px] object-cover border-4 border-stone-800 shadow-[6px_6px_0px_#000] mb-8"
          />
        )}

        {/* Content */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-stone-800 leading-relaxed text-lg mb-10"
        >
          {post.content}
        </motion.p>

        {/* Comments Section */}
        <div className="mt-10 border-t-2 border-stone-800 pt-6">
          <h2 className="text-2xl font-bold mb-4 uppercase">Comments</h2>

          {/* Existing comments */}
          <div className="space-y-4 mb-6">
            {comments.map((c) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="p-3 border-2 border-stone-800 bg-[#FFFDF5] shadow-[3px_3px_0px_#000]"
              >
                <p className="font-semibold text-sm">{c.user}:</p>
                <p className="text-stone-700">{c.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Add new comment */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 p-2 border-2 border-stone-800 shadow-[3px_3px_0px_#000] bg-[#FFFDF5] focus:outline-none"
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleAddComment}
              className="px-4 py-2.5 border-2 border-stone-800 bg-[#FDF6E3] shadow-[3px_3px_0px_#000] flex items-center gap-1"
            >
              <Send className="w-4 h-4" />
              <span className="text-sm">Post</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
