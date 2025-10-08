// src/components/Logo.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Logo() {
  const letters = "Wblog".split(""); // Sentence case looks better

  // ... (variants are the same)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };
  const letterVariants = {
    hidden: { opacity: 0, y: 20, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
  };

  return (
    <motion.h1
      className="text-4xl md:text-5xl tracking-normal select-none" // Reduced size
      style={{
        fontFamily: "'Creepster', cursive",
        color: "#1c1917",
        perspective: 400,
      }}
    >
      <Link to="/" className="relative group">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center"
        >
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              whileHover={{
                y: [0, -4, 0, 2, 0],
                rotate: [0, -2, 2, 0],
                scale: 1.1,
                transition: {
                  duration: 0.4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 0.2,
                },
              }}
              className="inline-block cursor-pointer"
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          className="absolute left-0 -bottom-2 w-full h-[2px] bg-stone-900"
          style={{ scaleX: 0, originX: 0.5 }}
          whileHover={{
            scaleX: 1,
            transition: { duration: 0.5, ease: [0.6, 0.01, -0.05, 0.95] },
          }}
        />
      </Link>
    </motion.h1>
  );
}
