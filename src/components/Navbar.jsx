// import { Link } from "react-router-dom";
// import useAuthStore from "../store/authStore";

// export default function Navbar() {
//   const user = useAuthStore((s) => s.user);

//   return (
//     // <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 text-green-400 border-b border-green-500">
//     //   <Link to="/" className="text-xl font-bold">
//     //     RetroBlog
//     //   </Link>
//     //   <div className="space-x-4">
//     //     <Link to="/posts">Feed</Link>
//     //     <Link to="/about">About</Link>
//     //     {user ? (
//     //       <Link to="/profile">Profile</Link>
//     //     ) : (
//     //       <>
//     //         <Link to="/login">Login</Link>
//     //         <Link to="/signup">Signup</Link>
//     //       </>
//     //     )}
//     //   </div>
//     // </nav>
//     <div className="min-h-screen bg-[#FDF6E3] text-stone-900 font-serif">
//       {/* Navbar */}
//       <nav className="flex justify-between items-center px-6 py-4 border-b-2 border-stone-400 bg-[#FAF3E0] shadow-md">
//         <h1 className="text-2xl font-bold uppercase tracking-widest">
//           RetroBlog
//         </h1>
//         <div className="space-x-6 text-sm font-semibold uppercase tracking-wider">
//           <Link to="#feed" className="hover:underline">
//             Feed
//           </Link>
//           <Link to="#about" className="hover:underline">
//             About Us
//           </Link>
//           {!user ? (
//             <>
//               <Link to="/login" className="hover:underline">
//                 Login
//               </Link>
//               <Link to="/signup" className="hover:underline">
//                 Signup
//               </Link>
//             </>
//           ) : (
//             <>
//               <Link to="/profile" className="hover:underline">
//                 Profile
//               </Link>
//             </>
//           )}
//         </div>
//       </nav>
//     </div>
//   );
// }


// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function Navbar() {
  const user = useAuthStore((s) => s.user);

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b-2 border-stone-400 bg-[#FAF3E0] shadow-md">
      <h1 className="text-2xl font-bold uppercase tracking-widest">
        <Link to="/" className="hover:underline">
          RetroBlog
        </Link>
      </h1>
      <div className="space-x-6 text-sm font-semibold uppercase tracking-wider">
        <Link to="/#feed" className="hover:underline">
          Feed
        </Link>
        <Link to="/#about" className="hover:underline">
          About Us
        </Link>
        {!user ? (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/signup" className="hover:underline">
              Signup
            </Link>
          </>
        ) : (
          <Link to="/profile" className="hover:underline">
            Profile
          </Link>
        )}
      </div>
    </nav>
  );
}
