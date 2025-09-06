
// // src/components/Navbar.jsx
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import useAuthStore from "../store/authStore";

// export default function Navbar() {
//   const user = useAuthStore((s) => s.user);

//   return (
//     <motion.nav
//       initial={{ y: -100, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ type: "spring", stiffness: 80 }}
//       className="flex justify-between items-center px-8 py-5 border-b-[3px] border-stone-700 bg-[#FAF3E0] shadow-[4px_4px_0px_#000000] font-serif"
//     >
//       {/* Logo */}
//       <motion.h1
//         whileHover={{ rotate: -2, scale: 1.05 }}
//         className="text-3xl font-extrabold uppercase tracking-[0.2em] text-stone-900"
//       >
//         <Link to="/" className="relative group">
//           Inkspire
//           <span className="absolute left-0 bottom-0 w-full h-[2px] bg-stone-900 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
//         </Link>
//       </motion.h1>

//       {/* Links */}
//       <div className="flex gap-8 text-sm font-bold uppercase tracking-widest">
//         {[
//           { to: "/posts", label: "Posts" },
//           { to: "/#about", label: "About Us" },
//           ...(!user
//             ? [
//                 { to: "/login", label: "Login" },
//                 { to: "/signup", label: "Signup" },
//               ]
//             : [{ to: "/profile", label: "Profile" }]),
//         ].map((item, idx) => (
//           <motion.div
//             key={idx}
//             whileHover={{
//               scale: 1.1,
//               rotate: idx % 2 === 0 ? -1 : 1,
//             }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//               {/* <button className="px-4 py-2 border-2 border-stone-800 bg-[#FDF6EC] hover:bg-[#FFE9B0] text-stone-700 font-bold uppercase tracking-wide rounded-sm shadow-[2px_2px_0px_#000000] transition-all duration-200 active:translate-y-[2px] active:shadow-none"> */}
//   <Link 
//     to={item.to}
//     className="relative group px-4 py-2 border-2 border-stone-800 bg-[#FDF6EC] hover:bg-[#FFE9B0] text-stone-700 font-bold uppercase tracking-wide rounded-sm shadow-[2px_2px_0px_#000000] transition-all duration-200 active:translate-y-[2px] active:shadow-none"
//   >
//     {item.label}
//     <span className="absolute left-0 bottom-0 w-full h-[2px] bg-stone-900 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
//   </Link>
// {/* </button> */}

//           </motion.div>
//         ))}
//       </div>
//     </motion.nav>
//   );
// }


// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useAuthStore from "../store/authStore";
import defaultAvatar from "../assets/default-avatar.jpg"; // 👈 added fallback

export default function Navbar() {
  const user = useAuthStore((s) => s.user);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80 }}
      className="flex justify-between items-center px-8 py-5 border-b-[3px] border-stone-700 bg-[#FAF3E0] shadow-[4px_4px_0px_#000000] font-serif"
    >
      {/* Logo */}
      <motion.h1
        whileHover={{ rotate: -2, scale: 1.05 }}
        className="text-3xl font-extrabold uppercase tracking-[0.2em] text-stone-900"
      >
        <Link to="/" className="relative group">
          Inkspire
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-stone-900 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
        </Link>
      </motion.h1>

      {/* Links */}
      <div className="flex gap-8 text-sm font-bold uppercase tracking-widest items-center">
        {[
          { to: "/posts", label: "Posts" },
          { to: "/#about", label: "About Us" },
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
                // 🔽 same logic, only UI: use different styling when it's the Profile item
                item.label === "Profile" && user
                  ? "p-0 border-2 border-stone-800 rounded-full shadow-[2px_2px_0px_#000000] overflow-hidden inline-flex"
                  : "relative group px-4 py-2 border-2 border-stone-800 bg-[#FDF6EC] hover:bg-[#FFE9B0] text-stone-700 font-bold uppercase tracking-wide rounded-sm shadow-[2px_2px_0px_#000000] transition-all duration-200 active:translate-y-[2px] active:shadow-none"
              }
            >
              {item.label === "Profile" && user ? (
                // 👇 circular avatar instead of text, no logic changed
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
    </motion.nav>
  );
}
