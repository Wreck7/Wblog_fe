// src/pages/PostDetail.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bookmark,
  Heart,
  Send,
  Share2,
  PencilLine,
  Trash2,
  Check,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import axiosClient from "../../utils/axiosClient"; // adjust path if needed
import useAuthStore from "../../store/authStore";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // post
  const [post, setPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(true);

  // likes
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  // bookmarks
  const [bookmarked, setBookmarked] = useState(false);

  // comments
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const postId = useMemo(() => id, [id]);

  // Edit post
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  // const [editCategory, setEditCategory] = useState("");
  const [editFile, setEditFile] = useState(null);
  const [saving, setSaving] = useState(false);

  // Share
  const handleShare = () => {
    const postUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: post?.title || "Post",
        text: "Check out this post!",
        url: postUrl,
      });
    } else {
      navigator.clipboard.writeText(postUrl);
      toast.success("Link copied to clipboard");
    }
  };

  // --- Fetchers ---
  useEffect(() => {
    let active = true;

    async function fetchPost() {
      setLoadingPost(true);
      try {
        const { data } = await axiosClient.get(`/posts/${postId}`);
        const p = data?.post || data?.res || data;
        if (active) setPost(p);
      } catch (e) {
        console.error(e);
        if (active) toast.error("Failed to load post");
      } finally {
        if (active) setLoadingPost(false);
      }
    }

    async function fetchLikes() {
      try {
        // total like count
        const { data } = await axiosClient.get(`/posts/${postId}/likes`);
        const count = typeof data === "number" ? data : data?.count ?? 0;
        setLikeCount(count);

        // check if current user liked
        const { data: likedData } = await axiosClient.get(
          `/posts/${postId}/likes/check`
        );
        setLiked(!!likedData?.liked);
      } catch (e) {
        console.error(e);
      }
    }

    async function fetchBookmarkStatus() {
      try {
        const { data } = await axiosClient.get(
          `/posts/${postId}/is-bookmarked`
        );
        setBookmarked(!!data?.bookmarked);
      } catch (e) {
        console.error(e);
      }
    }

    async function fetchComments() {
      setLoadingComments(true);
      try {
        const { data } = await axiosClient.get(`/posts/${postId}/comments`);
        const list = data?.res || data?.comments || [];
        setComments(list);
      } catch (e) {
        console.error(e);
        toast.error("Failed to load comments");
      } finally {
        setLoadingComments(false);
      }
    }

    fetchPost();
    fetchLikes();
    fetchBookmarkStatus();
    fetchComments();

    return () => {
      active = false;
    };
  }, [postId]);

  // --- Actions ---
  const toggleLike = async () => {
    if (!post) return;
    const prevLiked = liked;
    const prevCount = likeCount;

    try {
      if (liked) {
        setLiked(false);
        setLikeCount((c) => Math.max(0, c - 1));
        await axiosClient.delete(`/posts/${postId}/likes`);
      } else {
        setLiked(true);
        setLikeCount((c) => c + 1);
        await axiosClient.post(`/posts/${postId}/likes`);
      }
    } catch (e) {
      setLiked(prevLiked);
      setLikeCount(prevCount);
      toast.error("Failed to update like");
    }
  };

  const toggleBookmark = async () => {
    if (!post) return;
    const prev = bookmarked;
    try {
      if (bookmarked) {
        setBookmarked(false);
        await axiosClient.delete(`/posts/${postId}/bookmark`);
        toast.success("Bookmark removed");
      } else {
        setBookmarked(true);
        await axiosClient.post(`/posts/${postId}/bookmark`);
        toast.success("Post bookmarked");
      }
    } catch (e) {
      setBookmarked(prev);
      toast.error("Failed to update bookmark");
    }
  };
  // post delete logic
  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axiosClient.delete(`/posts/${postId}`);
      toast.success("Post deleted successfully");
      navigate("/posts"); // redirect to home or posts list
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete post");
    }
  };

  // post update logic
  const handleUpdatePost = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      if (editTitle) formData.append("title", editTitle);
      if (editContent) formData.append("content", editContent);
      // if (editCategory) formData.append("category_id", editCategory);
      if (editFile) formData.append("file", editFile);

      const { data } = await axiosClient.put(`/posts/${postId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Post updated");
      setPost(data.res); // update local state
      setIsEditing(false);
    } catch (e) {
      console.error(e);
      toast.error("Failed to update post");
    } finally {
      setSaving(false);
    }
  };

  // Add new comment
  const addComment = async () => {
    const content = newComment.trim();
    if (!content) return;
    try {
      const optimistic = {
        id: `temp-${Date.now()}`,
        content,
        profiles: { username: "You", image_url: "https://i.pravatar.cc/40" },
      };
      setComments((c) => [optimistic, ...c]); // prepend since backend returns desc order
      setNewComment("");

      await axiosClient.post(`/posts/${postId}/comments`, { content });
      toast.success("Comment added");

      // re-fetch to get real IDs/order
      const { data } = await axiosClient.get(`/posts/${postId}/comments`);
      setComments(data?.res || []);
    } catch (e) {
      toast.error("Failed to add comment");
    }
  };

  const startEdit = (comment) => {
    setEditingId(comment.id);
    setEditingText(comment.text || comment.content || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  // Update comment
  const saveEdit = async (commentId) => {
    const content = editingText.trim();
    if (!content) return;
    try {
      await axiosClient.put(`/posts/${commentId}/comments`, {
        content: content,
      }); // ✅ correct endpoint
      toast.success("Comment updated");

      setComments((c) =>
        c.map((cm) => (cm.id === commentId ? { ...cm, content } : cm))
      );
      cancelEdit();
    } catch (e) {
      console.error(e);
      toast.error("Failed to update comment");
    }
  };

  // Delete comment
  const deleteComment = async (commentId) => {
    const prev = comments;
    try {
      setComments((c) => c.filter((cm) => cm.id !== commentId));
      await axiosClient.delete(`/posts/${commentId}/comments`); // ✅ correct endpoint
      toast.success("Comment deleted");
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete comment");
      setComments(prev); // rollback
    }
  };

  if (loadingPost) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading post…
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Post not found.
      </div>
    );
  }

  const title = post.title;
  const content = post.content;
  const cover = post.cover_image_url;
  const author = post.profiles?.username || "Unknown";
  const author_id = post.author_id;
  const authorImage = post.profiles?.image_url || "https://i.pravatar.cc/50";
  const date = new Date(post.created_at || Date.now()).toLocaleDateString();

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen px-3 sm:px-6 py-6 sm:py-10 bg-[#FAF3E0] border-t-8 border-b-8 border-transparent font-serif relative"
    >
      {/* Overlay texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-30 mix-blend-multiply pointer-events-none"></div>

      <div className="relative max-w-3xl mx-auto border-4 border-stone-800 bg-[#FDF6E3] shadow-[10px_10px_0px_#000] p-4 sm:p-10">
        {/* Author + Actions bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b-2 border-stone-800 pb-3 mb-6 gap-3">
          <div
            onClick={() => navigate(`/profile/${author_id}`)}
            className="flex items-center gap-3 sm:gap-4 border-2 border-stone-800 bg-[#FAF3E0] px-3 sm:px-4 py-2 shadow-[4px_4px_0px_#000] cursor-pointer w-fit"
          >
            <img
              src={authorImage}
              alt={author}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-stone-800 shadow-sm"
            />
            <div>
              <p className="font-bold text-stone-900 text-sm sm:text-base">
                By {author}
              </p>
              <p className="text-xs text-stone-600">{date}</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4">
            {author_id === useAuthStore.getState().user.user.id && (
              <>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setEditTitle(title);
                    setEditContent(content);
                    setIsEditing(true);
                  }}
                  className="p-2 border-2 border-stone-800 shadow-[3px_3px_0px_#000] bg-yellow-100 hover:bg-yellow-200"
                  aria-label="Edit Post"
                >
                  <PencilLine className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDeletePost}
                  className="p-2 border-2 border-stone-800 shadow-[3px_3px_0px_#000] bg-red-100 hover:bg-red-200"
                  aria-label="Delete Post"
                >
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                </motion.button>
              </>
            )}

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleLike}
              className="p-2 border-2 border-stone-800 shadow-[3px_3px_0px_#000] bg-[#FDF6E3] flex items-center gap-1 sm:gap-2"
            >
              <Heart
                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  liked ? "fill-red-600 text-red-600" : "text-stone-800"
                }`}
              />
              <span className="text-xs sm:text-sm font-semibold">
                {likeCount}
              </span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleBookmark}
              className="p-2 border-2 border-stone-800 shadow-[3px_3px_0px_#000] bg-[#FDF6E3]"
              aria-label="Bookmark"
            >
              <Bookmark
                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  bookmarked
                    ? "fill-stone-800 text-stone-800"
                    : "text-stone-800"
                }`}
              />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="p-2 border-2 border-stone-800 shadow-[3px_3px_0px_#000] bg-[#FDF6E3]"
              aria-label="Share"
            >
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-stone-800" />
            </motion.button>
          </div>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-2xl sm:text-4xl font-extrabold uppercase mb-4 sm:mb-6 tracking-wider"
        >
          {title}
        </motion.h1>

        {/* Featured Image */}
        {cover && (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            src={cover}
            alt={title}
            className="w-full max-h-56 sm:max-h-[420px] object-cover border-4 border-stone-800 shadow-[6px_6px_0px_#000] mb-6 sm:mb-8"
          />
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="prose prose-stone max-w-none text-stone-800 leading-relaxed text-base sm:text-lg mb-8 sm:mb-10"
        >
          <p className="whitespace-pre-wrap">{content}</p>
        </motion.div>

        {/* Comments Section */}
        <div className="mt-8 sm:mt-10 border-t-2 border-stone-800 pt-4 sm:pt-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 uppercase">
            Comments
          </h2>

          {/* Existing comments */}
          {loadingComments ? (
            <p className="text-stone-700">Loading comments…</p>
          ) : (
            <div className="space-y-3 sm:space-y-4 mb-6">
              {comments.length === 0 && (
                <p className="text-stone-600">Be the first to comment.</p>
              )}
              {comments.map((c) => {
                const isEditing = editingId === c.id;
                const displayUser =
                  c.user || c.username || c.profiles?.username || "User";
                const avatar =
                  c.profiles?.image_url || "https://i.pravatar.cc/40";

                const isOwner =
                  c.author_id === useAuthStore.getState().user.user.id;

                return (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className="p-2 sm:p-3 border-2 border-stone-800 bg-[#FFFDF5] shadow-[3px_3px_0px_#000]"
                  >
                    <div className="flex items-start gap-2 sm:gap-3">
                      <img
                        src={avatar}
                        alt={displayUser}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-stone-800"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-xs sm:text-sm">
                            {displayUser}
                          </p>
                          {isOwner && (
                            <div className="flex items-center gap-1 sm:gap-2">
                              {isEditing ? (
                                <>
                                  <button
                                    onClick={() => saveEdit(c.id)}
                                    className="px-2 py-1 border-2 border-stone-800 bg-[#FDF6E3] shadow-[2px_2px_0px_#000] text-xs flex items-center gap-1"
                                  >
                                    <Check className="w-3 h-3 sm:w-4 sm:h-4" />{" "}
                                    Save
                                  </button>
                                  <button
                                    onClick={cancelEdit}
                                    className="px-2 py-1 border-2 border-stone-800 bg-[#FFF] shadow-[2px_2px_0px_#000] text-xs flex items-center gap-1"
                                  >
                                    <X className="w-3 h-3 sm:w-4 sm:h-4" />{" "}
                                    Cancel
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => startEdit(c)}
                                    className="px-2 py-1 border-2 border-stone-800 bg-[#FDF6E3] shadow-[2px_2px_0px_#000] text-xs flex items-center gap-1"
                                  >
                                    <PencilLine className="w-3 h-3 sm:w-4 sm:h-4" />{" "}
                                  </button>
                                  <button
                                    onClick={() => deleteComment(c.id)}
                                    className="px-2 py-1 border-2 border-stone-800 bg-[#FFF] shadow-[2px_2px_0px_#000] text-xs flex items-center gap-1"
                                  >
                                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />{" "}
                                  </button>
                                </>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Comment body */}
                        {isEditing ? (
                          <textarea
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            rows={3}
                            className="mt-2 w-full p-2 border-2 border-stone-800 bg-white shadow-[2px_2px_0px_#000] text-xs sm:text-sm"
                          />
                        ) : (
                          <p className="text-stone-700 mt-1 text-xs sm:text-sm">
                            {c.text || c.content}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Add new comment */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 p-2 border-2 border-stone-800 shadow-[3px_3px_0px_#000] bg-[#FFFDF5] focus:outline-none text-sm"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={addComment}
              className="px-3 sm:px-4 py-2 border-2 border-stone-800 bg-[#FDF6E3] shadow-[3px_3px_0px_#000] flex items-center gap-1 text-xs sm:text-sm"
            >
              <Send className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Post</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Retro Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative bg-[#FAF3E0] border-4 border-stone-800 shadow-[10px_10px_0px_#000] w-[95%] sm:w-[90%] max-w-xl p-4 sm:p-8 font-serif"
          >
            {/* Aged paper overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-25 mix-blend-multiply pointer-events-none"></div>

            {/* Title */}
            <h2 className="relative text-xl sm:text-3xl font-extrabold uppercase mb-4 sm:mb-6 tracking-wider text-center">
              ✍️ Edit Post
            </h2>

            {/* Title input */}
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Post Title"
              className="w-full p-2 sm:p-3 mb-3 sm:mb-4 border-2 border-stone-800 shadow-[4px_4px_0px_#000] bg-[#FFFBEA] focus:outline-none focus:ring-2 text-sm sm:text-base"
            />

            {/* Content textarea */}
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={5}
              placeholder="Write your story..."
              className="w-full p-2 sm:p-3 mb-3 sm:mb-4 border-2 border-stone-800 shadow-[4px_4px_0px_#000] bg-[#FFFBEA] focus:outline-none focus:ring-2 text-sm sm:text-base"
            />

            {/* File input */}
            <label className="block mb-4 cursor-pointer font-semibold uppercase text-xs sm:text-sm tracking-wider">
              <span className="block mb-1">Update Cover Image</span>
              <input
                type="file"
                onChange={(e) => setEditFile(e.target.files[0])}
                className="block w-full text-xs sm:text-sm border-2 border-stone-800 p-2 bg-[#FDF6E3] shadow-[3px_3px_0px_#000] cursor-pointer"
              />
            </label>

            {/* Buttons */}
            <div className="flex justify-end gap-3 sm:gap-4 mt-4 sm:mt-6">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsEditing(false)}
                className="px-4 sm:px-5 py-2 border-2 border-stone-800 bg-[#FDF6E3] shadow-[3px_3px_0px_#000] uppercase font-bold tracking-wider text-xs sm:text-sm hover:translate-x-1 hover:-translate-y-1 transition-transform"
              >
                Cancel
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleUpdatePost}
                disabled={saving}
                className="px-5 sm:px-6 py-2 border-2 border-stone-800 bg-yellow-300 shadow-[4px_4px_0px_#000] uppercase font-bold tracking-widest text-xs sm:text-sm hover:translate-x-1 hover:-translate-y-1 transition-transform disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.section>
  );
}
