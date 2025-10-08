// src/pages/Dashboard.jsx
import axiosClient from "../utils/axiosClient";
import useAuthStore from "../store/authStore";
import React, { useState, useEffect } from "react";
import {
  PenTool,
  BookOpen,
  Sparkles,
  Clock,
  Users,
  Star,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [typewriterIndex, setTypewriterIndex] = useState(0);

  const typewriterTexts = [
    "Vintage Stories",
    "Timeless Tales",
    "Classic Chronicles",
    "Retro Narratives",
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[id]").forEach((el) => {
      observer.observe(el);
    });

    const typewriterInterval = setInterval(() => {
      setTypewriterIndex((prev) => (prev + 1) % typewriterTexts.length);
    }, 3000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      clearInterval(typewriterInterval);
    };
  }, []);

  const stories = [
    {
      title: "The Coffee Shop Chronicles",
      author: "Emma Rodriguez",
      excerpt:
        "Every morning at 7:23 AM, she ordered the same thing. Black coffee, no sugar, extra shot. But today, something was different about the barista's smile...",
      date: "3 days ago",
      readTime: "4 min read",
      likes: 234,
    },
    {
      title: "Letters from Tomorrow",
      author: "Marcus Chen",
      excerpt:
        "I found the letters in my grandfather's attic, yellowed with age. The strange part? They were addressed to me, dated fifty years in the future...",
      date: "1 week ago",
      readTime: "6 min read",
      likes: 567,
    },
    {
      title: "The Last Vinyl Record",
      author: "Sophie Williams",
      excerpt:
        "In a world where music streams from thin air, Martha's record shop stood defiant. But when the last customer walked in, everything changed...",
      date: "2 weeks ago",
      readTime: "8 min read",
      likes: 891,
    },
  ];

  const features = [
    {
      icon: <PenTool className="w-8 h-8" />,
      title: "Vintage Editor",
      description:
        "Write with a beautiful typewriter-inspired editor that brings back the romance of writing",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Driven",
      description:
        "Connect with fellow writers, share feedback, and grow together in our supportive community",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Rich Formatting",
      description:
        "Express your creativity with our extensive formatting options and multimedia support",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Curated Content",
      description:
        "Get discovered through our editor's picks and trending stories sections",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Publishing Tools",
      description:
        "Schedule posts, manage drafts, and track your writing progress with powerful tools",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "AI Assistant",
      description:
        "Get writing suggestions and overcome writer's block with our gentle AI companion",
    },
  ];

  const { setUser } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosClient.get("/auth/me");
        setUser(res.data);
      } catch {
        // ignore if unauthenticated
      }
    };
    fetchUser();
  }, [setUser]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15, // stagger reveal per card
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 160, damping: 18 },
    },
    hover: {
      scale: 1.03,
      rotate: -1,
      transition: { type: "spring", stiffness: 260, damping: 14 },
    },
  };

  return (
    <div className="min-h-screen bg-[#FDF6E3] text-stone-700 font-serif overflow-x-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-20 left-10 w-32 h-32 bg-stone-200 rounded-full opacity-20 blur-xl transition-transform duration-100"
          style={{
            transform: `translateY(${scrollY * 0.1}px) rotate(${
              scrollY * 0.05
            }deg)`,
          }}
        />
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-stone-300 rounded-full opacity-20 blur-xl transition-transform duration-100"
          style={{
            transform: `translateY(${scrollY * -0.15}px) rotate(${
              scrollY * -0.08
            }deg)`,
          }}
        />
        <div
          className="absolute bottom-40 left-1/3 w-40 h-40 bg-stone-200 rounded-full opacity-10 blur-2xl transition-transform duration-100"
          style={{ transform: `translateY(${scrollY * 0.08}px)` }}
        />
      </div>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center pt-10"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <div className="text-center max-w-6xl mx-auto px-6">
          <div className="mb-8">
            <span className="inline-block bg-stone-200 text-stone-800 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-bounce">
              ✨ Where Stories Come Alive
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="block text-stone-800 mb-2">Write</span>
            <span className="block text-stone-600 relative">
              {typewriterTexts[typewriterIndex]}
              <span className="absolute -right-1 animate-pulse">|</span>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-stone-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Step into a world where every word matters. Our retro-inspired
            platform brings back the golden age of storytelling with modern
            tools for today's writers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a href="/post/create">
              <button className="group bg-stone-700 text-stone-100 cursor-pointer px-8 py-4 rounded-full text-lg font-semibold hover:bg-stone-800 transition-all transform hover:scale-105 hover:shadow-2xl flex items-center">
                Start Your Story
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </a>
            <a href="/posts">
              <button className="border-2 border-stone-700 text-stone-700 cursor-pointer px-8 py-4 rounded-full text-lg font-semibold hover:bg-stone-700 hover:text-stone-100 transition-all transform hover:scale-105">
                Explore Stories
              </button>
            </a>
          </div>

          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 text-stone-600 mx-auto" />
          </div>
        </div>

        {/* Vintage Decorations */}
        <div className="absolute top-1/4 left-10 opacity-20 hidden lg:block">
          <PenTool className="w-16 h-16 text-stone-600 animate-pulse" />
        </div>
        <div className="absolute bottom-1/4 right-10 opacity-20 hidden lg:block">
          <Sparkles
            className="w-12 h-12 text-stone-600 animate-spin"
            style={{ animationDuration: "8s" }}
          />
        </div>
      </section>

      {/* Featured Stories */}
      <section id="stories" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              isVisible.stories ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-stone-800 mb-6">
              Featured Stories
            </h2>
            <p className="text-xl text-stone-700 max-w-3xl mx-auto">
              Discover tales that transport you to different worlds, crafted by
              our community of passionate storytellers
            </p>
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible.stories ? "visible" : "hidden"}
            className="grid md:grid-cols-3 gap-10"
          >
            {stories.map((story, index) => (
              <motion.article
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="relative border-4 border-stone-800 bg-[#FAF3E0] shadow-[6px_6px_0px_#000] font-serif cursor-pointer group flex flex-col min-h-[300px] p-6 transform-gpu will-change-transform"
                style={{ transformOrigin: "center center" }}
              >
                {/* Author + Likes */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-800">
                    {story.author}
                  </span>
                  <div className="flex items-center text-stone-800">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    <span className="text-xs font-semibold">{story.likes}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-extrabold uppercase mb-3 tracking-wide group-hover:underline">
                  {story.title}
                </h3>

                {/* Excerpt */}
                <p className="text-stone-700 text-sm leading-relaxed mb-6 line-clamp-3">
                  {story.excerpt}
                </p>

                {/* Footer row */}
                <div className="mt-auto flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-stone-800">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{story.readTime}</span>
                  </div>
                  <span>{story.date}</span>
                </div>

                {/* Old paper overlay */}
                <div
                  className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-20 pointer-events-none mix-blend-multiply"
                  aria-hidden
                />
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section
        id="features"
        className="py-20 bg-gradient-to-b from-transparent to-stone-100/30"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible.features
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-5xl font-bold text-stone-800 mb-6">
              Why Choose Wblog?
            </h2>
            <p className="text-xl text-stone-700 max-w-3xl mx-auto">
              Experience the perfect blend of nostalgic charm and modern
              functionality
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`text-center p-8 rounded-2xl bg-white/40 backdrop-blur-sm border border-stone-200 hover:border-stone-400 transition-all duration-500 hover:shadow-xl hover:transform hover:scale-105 ${
                  isVisible.features
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-stone-700 text-stone-100 rounded-full mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-stone-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-stone-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10K+", label: "Active Writers" },
              { number: "50K+", label: "Stories Published" },
              { number: "2M+", label: "Monthly Readers" },
              { number: "95%", label: "Writer Satisfaction" },
            ].map((stat, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 ${
                  isVisible.features
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl md:text-5xl font-bold text-stone-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-stone-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-stone-800 mb-6">
              What Writers Say
            </h2>
            <p className="text-xl text-stone-700 max-w-3xl mx-auto">
              Hear from our community of passionate storytellers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Romance Novelist",
                quote:
                  "Wblog brought back my love for writing. The vintage editor feels like writing on my grandmother's typewriter, but with all the modern conveniences I need.",
              },
              {
                name: "David Chen",
                role: "Fantasy Author",
                quote:
                  "The community here is incredible. I've received more meaningful feedback in a month than I did in years on other platforms. My writing has improved dramatically.",
              },
              {
                name: "Maria Rodriguez",
                role: "Poetry Enthusiast",
                quote:
                  "Finally, a platform that understands that writing is an art form. The beautiful interface and thoughtful features inspire me to write every single day.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-stone-200 hover:border-stone-400 transition-all duration-300 hover:shadow-xl"
              >
                <p className="text-stone-700 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <div className="font-bold text-stone-800">
                    {testimonial.name}
                  </div>
                  <div className="text-stone-600 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-800 text-stone-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-stone-700 rounded-lg flex items-center justify-center mr-4">
                  <BookOpen className="w-8 h-8 text-stone-100" />
                </div>
                <span className="text-3xl font-bold">Wblog</span>
              </div>
              <p className="text-stone-300 mb-6 max-w-md">
                Where every story finds its voice and every writer finds their
                community. Crafted with ❤️ for storytellers everywhere.
              </p>
              <div className="flex space-x-4">
                <button className="w-10 h-10 bg-stone-700 rounded-full flex items-center justify-center hover:bg-stone-600 transition-colors">
                  📧
                </button>
                <button className="w-10 h-10 bg-stone-700 rounded-full flex items-center justify-center hover:bg-stone-600 transition-colors">
                  🐦
                </button>
                <button className="w-10 h-10 bg-stone-700 rounded-full flex items-center justify-center hover:bg-stone-600 transition-colors">
                  📘
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-stone-300">
                <li>
                  <a
                    href="#"
                    className="hover:text-stone-100 transition-colors"
                  >
                    Write Stories
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-stone-100 transition-colors"
                  >
                    Discover
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-stone-100 transition-colors"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-stone-100 transition-colors"
                  >
                    Publishing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-stone-300">
                <li>
                  <a
                    href="#"
                    className="hover:text-stone-100 transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-stone-100 transition-colors"
                  >
                    Writing Guide
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-stone-100 transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-stone-100 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-stone-700 pt-8 text-center">
            <p className="text-stone-400">
              © 2025 Wblog. All rights reserved. Made with vintage love and
              modern code.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
