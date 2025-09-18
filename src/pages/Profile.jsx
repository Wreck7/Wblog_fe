// src/pages/Profile.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PostCard from "./Posts/PostCard";
import defaultAvatar from "../assets/default-avatar.jpg";
import axiosClient from "../utils/axiosClient";

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("posts");
  const [modalType, setModalType] = useState(null);
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [posts, setPosts] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  // fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosClient.get("/profile/me");
        if (data?.res) {
          setUser(data.res);
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchProfile();
  }, []);

  // fetch followers/following (always fresh)
  const fetchFollowData = async () => {
    try {
      const [followersRes, followingRes] = await Promise.all([
        axiosClient.get(`/users/${user?.id}/followers`),
        axiosClient.get(`/users/${user?.id}/following`),
      ]);
      setFollowers(followersRes.data?.followers || []);
      setFollowing(followingRes.data?.following || []);
    } catch (err) {
      console.error("Failed to fetch followers/following:", err);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchFollowData();
    }
  }, [user?.id]);

  // fetch posts
  useEffect(() => {
    if (activeTab === "posts" && user?.id) {
      const fetchPosts = async () => {
        try {
          const { data } = await axiosClient.get(`/posts/all/${user.id}`);
          setPosts(data?.posts || []);
        } catch (err) {
          console.error("Failed to fetch posts:", err);
        }
      };
      fetchPosts();
    }
  }, [activeTab, user?.id]);

  // fetch bookmarks
  useEffect(() => {
    if (activeTab === "bookmarks") {
      const fetchBookmarks = async () => {
        try {
          const { data } = await axiosClient.get("/bookmarks");
          setBookmarks(data?.bookmarks || []);
        } catch (err) {
          console.error("Failed to fetch bookmarks:", err);
        }
      };
      fetchBookmarks();
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#FDF6E3] p-4 sm:p-6 md:p-8 font-serif">
      {/* Profile Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="flex flex-col items-center border-4 border-stone-800 bg-[#FAF3E0] shadow-[6px_6px_0px_#000] p-4 sm:p-6 rounded-lg mb-8 md:mb-10 relative w-full max-w-3xl mx-auto"
      >
        <img
          src={user?.image_url || defaultAvatar}
          alt="Profile"
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-4 border-stone-800 shadow-[4px_4px_0px_#000] mb-3 sm:mb-4 object-cover"
        />
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase mb-1 tracking-widest text-center break-words">
          {user?.username || "Loading..."}
        </h2>
        {user?.bio && (
          <p className="italic text-stone-700 mb-3 text-center text-sm sm:text-base px-2">
            {user.bio}
          </p>
        )}

        {/* Followers & Following */}
        <div className="flex gap-6 sm:gap-10 text-center flex-wrap justify-center">
          <button onClick={() => setModalType("followers")}>
            <p className="text-lg sm:text-xl font-bold cursor-pointer">
              {followers.length}
            </p>
            <span className="uppercase text-xs sm:text-sm tracking-widest">
              Followers
            </span>
          </button>
          <button onClick={() => setModalType("following")}>
            <p className="text-lg sm:text-xl font-bold">{following.length}</p>
            <span className="uppercase text-xs sm:text-sm tracking-widest">
              Following
            </span>
          </button>
        </div>

        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-15 pointer-events-none mix-blend-multiply"></div>
      </motion.div>

      {/* Tabs */}
      <div className="flex justify-center mb-6 flex-wrap gap-4">
        <button
          onClick={() => setActiveTab("posts")}
          className={`px-4 sm:px-6 py-2 border-2 border-stone-800 shadow-[3px_3px_0px_#000] uppercase font-bold text-xs sm:text-sm md:text-base tracking-widest ${
            activeTab === "posts"
              ? "bg-stone-800 text-[#FAF3E0]"
              : "bg-[#FDF6E3] hover:bg-stone-200"
          }`}
        >
          Posts
        </button>
        <button
          onClick={() => setActiveTab("bookmarks")}
          className={`px-4 sm:px-6 py-2 border-2 border-stone-800 shadow-[3px_3px_0px_#000] uppercase font-bold text-xs sm:text-sm md:text-base tracking-widest ${
            activeTab === "bookmarks"
              ? "bg-stone-800 text-[#FAF3E0]"
              : "bg-[#FDF6E3] hover:bg-stone-200"
          }`}
        >
          Bookmarks
        </button>
      </div>

      {/* Tab Content */}
      <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="wait">
          {activeTab === "posts" && (
            <motion.div
              key="posts"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.3 }}
              className="col-span-full grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {posts.length > 0 ? (
                posts.map((post) => (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    excerpt={post.content.slice(0, 100) + "..."}
                    coverImage={post.cover_image_url}
                    author={post.profiles.username}
                    authorImage={post.profiles.image_url}
                    category={null}
                  />
                ))
              ) : (
                <p className="col-span-full text-center italic text-sm sm:text-base">
                  No posts yet...
                </p>
              )}
            </motion.div>
          )}

          {activeTab === "bookmarks" && (
            <motion.div
              key="bookmarks"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="col-span-full grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {bookmarks.length > 0 ? (
                bookmarks.map((bm) => {
                  const post = bm.posts;
                  return (
                    <PostCard
                      key={post.id}
                      id={post.id}
                      title={post.title}
                      excerpt={post.content.slice(0, 100) + "..."}
                      coverImage={post.cover_image_url}
                      author={post.profiles.username}
                      authorImage={post.profiles.image_url}
                      category={null}
                    />
                  );
                })
              ) : (
                <p className="col-span-full text-center italic text-sm sm:text-base">
                  No bookmarks yet...
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal (followers/following) */}
      <AnimatePresence>
        {modalType && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-[#FAF3E0] border-4 border-stone-800 shadow-[6px_6px_0px_#000] p-4 sm:p-6 rounded-lg w-full max-w-sm relative"
            >
              <h3 className="text-lg sm:text-xl font-bold mb-4 uppercase tracking-widest text-center">
                {modalType === "followers" ? "Followers" : "Following"}
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1 sm:pr-2">
                {(modalType === "followers" ? followers : following).map(
                  (u) => {
                    const profile = u.profiles;
                    return (
                      <div
                        key={u.follower_id || u.following_id}
                        className="flex items-center gap-3 border-b border-stone-300 pb-2 cursor-pointer hover:bg-stone-200 transition px-2"
                        onClick={() => {
                          setModalType(null);
                          navigate(
                            `/profile/${
                              profile?.id || u.follower_id || u.following_id
                            }`
                          );
                        }}
                      >
                        <img
                          src={profile?.image_url || defaultAvatar}
                          alt={profile?.username}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-stone-800 object-cover"
                        />
                        <span className="font-semibold text-sm sm:text-base">
                          {profile?.username}
                        </span>
                      </div>
                    );
                  }
                )}
              </div>

              <button
                onClick={() => setModalType(null)}
                className="absolute top-2 right-2 border-2 border-stone-800 px-2 py-1 bg-stone-800 text-[#FAF3E0] font-bold shadow-[2px_2px_0px_#000] text-sm"
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
