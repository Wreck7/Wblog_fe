// src/pages/Profile.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PostCard from "./Posts/PostCard";
import axiosClient from "../utils/axiosClient";
import defaultAvatar from "../assets/default-avatar.jpg";

export default function OthersProfile() {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("posts");
  const [modalType, setModalType] = useState(null);
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // 👈 add state for logged-in user
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [posts, setPosts] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  // ✅ Fetch current logged-in user once
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { data } = await axiosClient.get("/auth/me"); // or wherever you get current user
        if (data?.user) setCurrentUser(data.user);
      } catch (err) {
        console.error("Failed to fetch current user:", err);
      }
    };
    fetchCurrentUser();
  }, []);

  const fetchFollowData = async () => {
    try {
      const [followersRes, followingRes] = await Promise.all([
        axiosClient.get(`/users/${user_id}/followers`),
        axiosClient.get(`/users/${user_id}/following`),
      ]);

      setFollowers(followersRes.data?.followers || []);
      setFollowing(followingRes.data?.following || []);
    } catch (err) {
      console.error("Failed to fetch followers/following:", err);
    }
  };

  useEffect(() => {
    if (user_id) {
      fetchFollowData();
    }
  }, [user_id]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosClient.get(`/profiles/${user_id}`);
        if (data?.res) {
          setUser(data.res);

          // Only check following if profile ≠ current user
          if (currentUser?.id !== user_id) {
            const check = await axiosClient.get(
              `/users/${user_id}/is-following`
            );
            setIsFollowing(check.data?.is_following || false);
          }
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    if (user_id) fetchProfile();
  }, [user_id, currentUser]);

  // fetch followers and following on mount / when user_id changes
  useEffect(() => {
    if (!user_id) return;

    const fetchFollowData = async () => {
      try {
        const [followersRes, followingRes] = await Promise.all([
          axiosClient.get(`/users/${user_id}/followers`),
          axiosClient.get(`/users/${user_id}/following`),
        ]);

        setFollowers(followersRes.data?.followers || []);
        setFollowing(followingRes.data?.following || []);
      } catch (err) {
        console.error("Failed to fetch followers/following:", err);
      }
    };

    fetchFollowData();
  }, [user_id]);

  // fetch posts
  useEffect(() => {
    if (activeTab === "posts" && user_id) {
      const fetchPosts = async () => {
        try {
          const { data } = await axiosClient.get(`/posts/all/${user_id}`);
          setPosts(data?.posts || []);
        } catch (err) {
          console.error("Failed to fetch posts:", err);
        }
      };
      fetchPosts();
    }
  }, [activeTab, user_id]);

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

  const handleFollowToggle = async () => {
    if (!user) return;
    try {
      setLoading(true);
      if (isFollowing) {
        await axiosClient.delete(`/users/${user_id}/follow`);
        setIsFollowing(false);
      } else {
        await axiosClient.post(`/users/${user_id}/follow`);
        setIsFollowing(true);
      }

      // 👇 Refresh followers/following count after action
      await fetchFollowData();
    } catch (err) {
      console.error("Follow/Unfollow failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (type) => {
    setModalType(type);
  };

  return (
    <div className="min-h-screen bg-[#FDF6E3] p-4 sm:p-6 md:p-8 font-serif">
      {/* Profile Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="flex flex-col items-center border-4 border-stone-800 bg-[#FAF3E0] shadow-[6px_6px_0px_#000] p-4 sm:p-6 rounded-lg mb-6 sm:mb-10 relative w-full max-w-lg mx-auto"
      >
        <img
          src={user?.image_url || defaultAvatar}
          alt="Profile"
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-stone-800 shadow-[4px_4px_0px_#000] mb-3 sm:mb-4"
        />
        <h2 className="text-2xl sm:text-3xl font-extrabold uppercase mb-1 tracking-widest text-center">
          {user?.username || "Loading..."}
        </h2>
        {user?.bio && (
          <p className="italic text-stone-700 mb-3 text-center px-2 text-sm sm:text-base">
            {user.bio}
          </p>
        )}

        {/* Follow / Unfollow button */}
        {user && currentUser?.id !== user?.id && (
          <button
            onClick={handleFollowToggle}
            disabled={loading}
            className={`px-4 py-2 mt-2 border-2 border-stone-800 font-bold uppercase tracking-widest shadow-[3px_3px_0px_#000] w-full sm:w-auto ${
              isFollowing
                ? "bg-red-600 text-[#FAF3E0] hover:bg-red-700"
                : "bg-green-600 text-[#FAF3E0] hover:bg-green-700"
            }`}
          >
            {loading ? "..." : isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}

        {/* Followers & Following */}
        <div className="flex gap-6 sm:gap-10 text-center mt-4 w-full justify-center">
          <button
            onClick={() => openModal("followers")}
            className="flex-1 sm:flex-none"
          >
            <p className="text-lg sm:text-xl font-bold cursor-pointer">
              {followers.length}
            </p>
            <span className="uppercase text-xs tracking-widest">Followers</span>
          </button>
          <button
            onClick={() => openModal("following")}
            className="flex-1 sm:flex-none"
          >
            <p className="text-lg sm:text-xl font-bold">{following.length}</p>
            <span className="uppercase text-xs tracking-widest">Following</span>
          </button>
        </div>

        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-15 pointer-events-none mix-blend-multiply"></div>
      </motion.div>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row justify-center mb-6 gap-3 sm:gap-4 w-full max-w-md mx-auto">
        <button
          onClick={() => setActiveTab("posts")}
          className={`px-6 py-2 border-2 border-stone-800 shadow-[3px_3px_0px_#000] uppercase font-bold text-sm tracking-widest flex-1 ${
            activeTab === "posts"
              ? "bg-stone-800 text-[#FAF3E0]"
              : "bg-[#FDF6E3] hover:bg-stone-200"
          }`}
        >
          Posts
        </button>
        <button
          onClick={() => setActiveTab("bookmarks")}
          className={`px-6 py-2 border-2 border-stone-800 shadow-[3px_3px_0px_#000] uppercase font-bold text-sm tracking-widest flex-1 ${
            activeTab === "bookmarks"
              ? "bg-stone-800 text-[#FAF3E0]"
              : "bg-[#FDF6E3] hover:bg-stone-200"
          }`}
        >
          Bookmarks
        </button>
      </div>

      {/* Tab Content */}
      <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="wait">
          {activeTab === "posts" && (
            <motion.div
              key="posts"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.3 }}
              className="col-span-full grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
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
                <p className="col-span-full text-center italic">
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
              className="col-span-full grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
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
                <p className="col-span-full text-center italic">
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
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-[#FAF3E0] border-4 border-stone-800 shadow-[6px_6px_0px_#000] p-4 sm:p-6 rounded-lg w-full max-w-sm relative"
            >
              <h3 className="text-lg sm:text-xl font-bold mb-4 uppercase tracking-widest">
                {modalType === "followers" ? "Followers" : "Following"}
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1 sm:pr-2">
                {(modalType === "followers" ? followers : following).map(
                  (u) => {
                    const profile = u.profiles;
                    return (
                      <div
                        key={u.follower_id || u.following_id}
                        className="flex items-center gap-3 border-b border-stone-300 pb-2 cursor-pointer hover:bg-stone-200 transition"
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
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-stone-800 object-cover"
                        />
                        <span className="font-semibold">
                          {profile?.username}
                        </span>
                      </div>
                    );
                  }
                )}
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
