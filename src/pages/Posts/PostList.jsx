// src/components/Feed.jsx
import { div } from "framer-motion/client";
import PostCard from "./PostCard";
import { Link } from "react-router-dom";

const posts = [
  {
    id: 1,
    title: "The Rise of Retro Tech",
    excerpt:
      "Vintage vibes meet modern code. Explore how old-school styles are taking over today’s blogs...",
  },
  {
    id: 2,
    title: "Breaking: JavaScript Strikes Again",
    excerpt:
      "Love it or hate it, JS continues to dominate. Here’s why developers keep coming back...",
  },
  {
    id: 3,
    title: "Supabase vs Firebase",
    excerpt:
      "Which backend-as-a-service deserves the retro crown? Let’s dive deep into features and feel...",
  },
];

export default function Feed() {
  return (
    // <section
    //   id="feed"
    //   className="py-20 px-6 bg-[#FDF6E3] border-t-4 border-stone-800"
    // >
    <>
      <h3 className="text-4xl font-extrabold uppercase my-12 text-center tracking-widest">
        The Daily Feed
      </h3>
      <div className="flex flex-col md:flex-row justify-end-safe items-center mx-2 my-10 gap-4">
        {/* Category Selector */}
        <select className="px-2 py-2 border-4 border-stone-800 bg-[#FFFBEA] shadow-[4px_4px_0px_#000] text-stone-900 uppercase text-sm font-bold tracking-wider cursor-pointer hover:translate-x-1 hover:-translate-y-1 transition-transform">
          <option selected value="all">📰 All</option>
          <option value="tech">💻 Tech</option>
          <option value="lifestyle">🌿 Lifestyle</option>
          <option value="travel">✈️ Travel</option>
          <option value="retro">Entertainment</option>
        </select>

        {/* Create Post Button */}
        <Link
          to="/post/create"
          className="px-6 py-2 border-4 border-stone-800 bg-[#FDF6E3] font-bold uppercase text-sm tracking-widest shadow-[5px_5px_0px_#000] hover:translate-x-1 hover:-translate-y-1 transition-transform"
        >
          Create Post
        </Link>
      </div>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p, i) => (
          <PostCard key={i} id={p.id} title={p.title} excerpt={p.excerpt} />
        ))}
      </div>
    </>
    // </section>
  );
}
