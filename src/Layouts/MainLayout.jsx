// import { Outlet, Link } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Dashboard from "../pages/Dashboard";

// export default function MainLayout() {
//   return (
//     // <div className="min-h-screen bg-[#fdf6e3] font-serif">
//     //   <header className="border-b border-black p-4 flex justify-between items-center bg-[#fffdf5] shadow-md">
//     //     <h1 className="text-3xl font-bold tracking-wide">📰 Retro Blog</h1>
//     //     <nav className="space-x-4">
//     //       <Link to="/" className="hover:underline">
//     //         Dashboard
//     //       </Link>
//     //       <Link to="/posts" className="hover:underline">
//     //         Posts
//     //       </Link>
//     //       <Link to="/profile" className="hover:underline">
//     //         Profile
//     //       </Link>
//     //     </nav>
//     //   </header>
//     <div className="min-h-screen bg-gray-900 text-white font-mono">
//       <Navbar />
//       <main className="p-6">
//         <Outlet />
//       </main>
//     </div>
//     // </div>
//   );
// }


// src/layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#FDF6E3] text-stone-900 font-serif">
      <Navbar />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
