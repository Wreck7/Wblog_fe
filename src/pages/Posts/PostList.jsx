

// src/components/Feed.jsx
import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { Link } from "react-router-dom";

export default function Feed() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [posts, setPosts] = useState([]);

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("https://wblog-be.onrender.com/categories");
        const data = await res.json();
        setCategories(data.categories || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    }
    fetchCategories();
  }, []);

  // Fetch posts when selectedCategory changes
  useEffect(() => {
    async function fetchPosts() {
      try {
        let url =
          selectedCategory === "all"
            ? "https://wblog-be.onrender.com/posts"
            : `https://wblog-be.onrender.com/feed?category_id=${selectedCategory}`;

        const res = await fetch(url);
        const data = await res.json();

        // Handle different API keys: "res" for all, "posts" for filtered
        const postsData = data.posts || data.res || [];
        setPosts(postsData);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    }
    fetchPosts();
  }, [selectedCategory]);

  return (
    <>
      <h3 className="text-4xl font-extrabold uppercase my-12 text-center tracking-widest">
        The Daily Feed
      </h3>
      <div className="flex flex-col md:flex-row justify-end-safe items-center mx-2 my-10 gap-4">
        {/* Category Selector */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-2 py-2 border-4 border-stone-800 bg-[#FFFBEA] shadow-[4px_4px_0px_#000] text-stone-900 uppercase text-sm font-bold tracking-wider cursor-pointer hover:translate-x-1 hover:-translate-y-1 transition-transform"
        >
          <option value="all">📰 All</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Create Post Button */}
        <Link
          to="/post/create"
          className="px-6 py-2 border-4 border-stone-800 bg-[#FDF6E3] font-bold uppercase text-sm tracking-widest shadow-[5px_5px_0px_#000] hover:translate-x-1 hover:-translate-y-1 transition-transform"
        >
          Create Post
        </Link>
      </div>

      {/* Posts */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {posts.length > 0 ? (
          posts.map((p) => (
            <PostCard
              key={p.id}
              id={p.id}
              title={p.title}
              excerpt={p.content}
              coverImage={p.cover_image_url}
              author={p.profiles?.username}
              authorImage={p.profiles?.image_url}
              category={p.categories?.name}
            />
          ))
        ) : (
          <p className="text-center text-lg col-span-full">No posts found.</p>
        )}
      </div>
    </>
  );
}
