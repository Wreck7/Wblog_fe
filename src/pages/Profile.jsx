// src/pages/Profile.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PostCard from "./Posts/PostCard";

const dummyPosts = [
  { title: "Retro Post 1", excerpt: "Lorem ipsum dolor sit amet..." },
  { title: "Retro Post 2", excerpt: "Vintage vibes meet modern code..." },
];

const dummyBookmarks = [
  { title: "Bookmarked Post A", excerpt: "Saved for later reading..." },
  { title: "Bookmarked Post B", excerpt: "Classic retro blog vibes..." },
];

const dummyUsers = [
  { name: "Alice Retro", img: "https://i.pravatar.cc/100?img=11" },
  { name: "Bob Vintage", img: "https://i.pravatar.cc/100?img=12" },
  { name: "Charlie Oldskool", img: "https://i.pravatar.cc/100?img=13" },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("posts");
  const [modalType, setModalType] = useState(null);

  return (
    <div className="min-h-screen bg-[#FDF6E3] p-8 font-serif">
      {/* Profile Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="flex flex-col items-center border-4 border-stone-800 bg-[#FAF3E0] shadow-[6px_6px_0px_#000] p-6 rounded-lg mb-10 relative"
      >
        <img
          src="https://i.pravatar.cc/150?img=8"
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-stone-800 shadow-[4px_4px_0px_#000] mb-4"
        />
        <h2 className="text-3xl font-extrabold uppercase mb-2 tracking-widest">
          RetroUser
        </h2>

        {/* Followers & Following */}
        <div className="flex gap-10 text-center">
          <button onClick={() => setModalType("followers")}>
            <p className="text-xl font-bold cursor-pointer">120</p>
            <span className="uppercase text-xs tracking-widest">Followers</span>
          </button>
          <button onClick={() => setModalType("following")}>
            <p className="text-xl font-bold">89</p>
            <span className="uppercase text-xs tracking-widest">Following</span>
          </button>
        </div>

        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-15 pointer-events-none mix-blend-multiply"></div>
      </motion.div>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setActiveTab("posts")}
          className={`px-6 py-2 border-2 border-stone-800 shadow-[3px_3px_0px_#000] uppercase font-bold text-sm tracking-widest ${
            activeTab === "posts"
              ? "bg-stone-800 text-[#FAF3E0]"
              : "bg-[#FDF6E3] hover:bg-stone-200"
          }`}
        >
          Posts
        </button>
        <button
          onClick={() => setActiveTab("bookmarks")}
          className={`px-6 py-2 border-2 border-stone-800 shadow-[3px_3px_0px_#000] uppercase font-bold text-sm tracking-widest ml-4 ${
            activeTab === "bookmarks"
              ? "bg-stone-800 text-[#FAF3E0]"
              : "bg-[#FDF6E3] hover:bg-stone-200"
          }`}
        >
          Bookmarks
        </button>
      </div>

      {/* Tab Content */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="wait">
          {activeTab === "posts" && (
            <motion.div
              key="posts"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.3 }}
              className="col-span-full grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {dummyPosts.map((p, i) => (
                <PostCard key={i} title={p.title} excerpt={p.excerpt} />
              ))}
            </motion.div>
          )}

          {activeTab === "bookmarks" && (
            <motion.div
              key="bookmarks"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="col-span-full grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {dummyBookmarks.map((b, i) => (
                <PostCard key={i} title={b.title} excerpt={b.excerpt} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalType && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-[#FAF3E0] border-4 border-stone-800 shadow-[6px_6px_0px_#000] p-6 rounded-lg w-80 relative"
            >
              <h3 className="text-xl font-bold mb-4 uppercase tracking-widest">
                {modalType === "followers" ? "Followers" : "Following"}
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {dummyUsers.map((u, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 border-b border-stone-300 pb-2"
                  >
                    <img
                      src={u.img}
                      alt={u.name}
                      className="w-10 h-10 rounded-full border-2 border-stone-800"
                    />
                    <span className="font-semibold">{u.name}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setModalType(null)}
                className="absolute top-2 right-2 border-2 border-stone-800 px-2 py-1 bg-stone-800 text-[#FAF3E0] font-bold shadow-[2px_2px_0px_#000]"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
