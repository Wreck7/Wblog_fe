
// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react"; // hamburger + close icons
import useAuthStore from "../store/authStore";
import defaultAvatar from "../assets/default-avatar.jpg"; // 👈 added fallback
import Logo from "./Logo";

export default function Navbar() {
  const user = useAuthStore((s) => s.user);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80 }}
      className="flex justify-between items-center px-6 md:px-8 py-5 border-b-[1px] border-stone-700 bg-[#FAF3E0] shadow-[4px_4px_0px_#000000] font-serif relative z-[100]"
    >
      {/* Logo */}
      {/* <motion.h1
        whileHover={{ rotate: -2, scale: 1.05 }}
        className="text-2xl md:text-3xl font-extrabold uppercase tracking-[0.2em] text-stone-900"
      >
        <Link to="/" className="relative group">
          Wblog
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-stone-900 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
        </Link>
      </motion.h1> */}
      <Logo/>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest items-center">
        {[
          { to: "/posts", label: "Posts" },
          { to: "/post/create", label: "Write" },
          // { to: "/#about", label: "About Us" },
          ...(!user
            ? [
                { to: "/login", label: "Login" },
                { to: "/signup", label: "Signup" },
              ]
            : [{ to: "/profile", label: "Profile" }]),
        ].map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.1, rotate: idx % 2 === 0 ? -1 : 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              to={item.to}
              className={
                item.label === "Profile" && user
                  ? "p-0 border-2 border-stone-800 rounded-full shadow-[2px_2px_0px_#000000] overflow-hidden inline-flex"
                  : "relative group px-4 py-2 border-2 border-stone-800 bg-[#FDF6EC] hover:bg-[#FFE9B0] text-stone-700 font-bold uppercase tracking-wide rounded-sm shadow-[2px_2px_0px_#000000] transition-all duration-200 active:translate-y-[2px] active:shadow-none"
              }
            >
              {item.label === "Profile" && user ? (
                <img
                  src={user.image_url || defaultAvatar}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                />
              ) : (
                <>
                  {item.label}
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-stone-900 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </>
              )}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex items-center border-2 border-stone-800 p-2 rounded-sm shadow-[2px_2px_0px_#000000] bg-[#FDF6EC]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 w-full bg-[#FAF3E0] border-t-2 border-stone-700 shadow-[4px_4px_0px_#000000] flex flex-col items-center gap-6 py-6 z-50 md:hidden"
        >
          {[
            { to: "/posts", label: "Stories" },
            { to: "/post/create", label: "Write" },
            // { to: "/#about", label: "About Us" },
            ...(!user
              ? [
                  { to: "/login", label: "Login" },
                  { to: "/signup", label: "Signup" },
                ]
              : [{ to: "/profile", label: "Profile" }]),
          ].map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className="px-6 py-3 border-2 border-stone-800 bg-[#FDF6EC] hover:bg-[#FFE9B0] text-stone-700 font-bold uppercase tracking-wide rounded-sm shadow-[2px_2px_0px_#000000] transition-all duration-200"
            >
              {item.label}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
