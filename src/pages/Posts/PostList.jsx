// src/components/Feed.jsx
import PostCard from "./PostCard";

const posts = [
  {
    title: "The Rise of Retro Tech",
    excerpt:
      "Vintage vibes meet modern code. Explore how old-school styles are taking over today’s blogs...",
  },
  {
    title: "Breaking: JavaScript Strikes Again",
    excerpt:
      "Love it or hate it, JS continues to dominate. Here’s why developers keep coming back...",
  },
  {
    title: "Supabase vs Firebase",
    excerpt:
      "Which backend-as-a-service deserves the retro crown? Let’s dive deep into features and feel...Which backend-as-a-service deserves the retro crown? Let’s dive deep into features and feel...Which backend-as-a-service deserves the retro crown? Let’s dive deep into features and feel...Which backend-as-a-service deserves the retro crown? Let’s dive deep into features and feel...Which backend-as-a-service deserves the retro crown? Let’s dive deep into features and feel...Which backend-as-a-service deserves the retro crown? Let’s dive deep into features and feel...Which backend-as-a-service deserves the retro crown? Let’s dive deep into features and feel...Which backend-as-a-service deserves the retro crown? Let’s dive deep into features and feel...",
  },
];

export default function Feed() {
  return (
    <section
      id="feed"
      className="py-20 px-6 bg-[#FDF6E3] border-t-4 border-stone-800"
    >
      <h3 className="text-4xl font-extrabold uppercase mb-12 text-center tracking-widest">
        The Daily Feed
      </h3>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p, i) => (
          <PostCard key={i} title={p.title} excerpt={p.excerpt} />
        ))}
      </div>
    </section>
  );
}
