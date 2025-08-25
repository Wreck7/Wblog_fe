// src/components/Feed.jsx
import { div } from "framer-motion/client";
import PostCard from "./PostCard";

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

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p, i) => (
          <PostCard key={i} id={p.id} title={p.title} excerpt={p.excerpt} />
        ))}
      </div>
      </>
    // </section>
  );
}
