// import { useEffect } from "react";
// import { Link } from "react-router-dom";
// import axiosClient from "../utils/axiosClient";
// import useAuthStore from "../store/authStore";

// export default function Dashboard() {
//   const { user, setUser } = useAuthStore();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axiosClient.get("/auth/me");
//         setUser(res.data);
//       } catch (err) {
//         console.error("User fetch failed", err);
//       }
//     };
//     fetchUser();
//   }, [setUser]);

//   return (
//     // < className="min-h-screen bg-[#FDF6E3] text-stone-900 font-serif">
//     //   {/* Navbar */}
//     //   <nav className="flex justify-between items-center px-6 py-4 border-b-2 border-stone-400 bg-[#FAF3E0] shadow-md">
//     //     <h1 className="text-2xl font-bold uppercase tracking-widest">
//     //       RetroBlog
//     //     </h1>
//     //     <div className="space-x-6 text-sm font-semibold uppercase tracking-wider">
//     //           <Link to="#feed" className="hover:underline">
//     //             Feed
//     //           </Link>
//     //           <Link to="#about" className="hover:underline">
//     //             About Us
//     //           </Link>
//     //       {!user ? (
//     //         <>
//     //           <Link to="/login" className="hover:underline">
//     //             Login
//     //           </Link>
//     //           <Link to="/signup" className="hover:underline">
//     //             Signup
//     //           </Link>
//     //         </>
//     //       ) : (
//     //         <>
//     //           <Link to="/profile" className="hover:underline">
//     //             Profile
//     //           </Link>
//     //         </>
//     //       )}
//     //     </div>
//     //   </nav>
//     <>
//       {/* Landing Page / Hero */}
//       <section className="h-[70vh] flex flex-col justify-center items-center text-center px-6">
//         <h2 className="text-5xl font-bold uppercase mb-4 tracking-widest">
//           Extra! Extra! Read All About It!
//         </h2>
//         <p className="text-lg max-w-xl text-stone-700">
//           Welcome to <span className="font-bold">RetroBlog</span>, your digital
//           newspaper with a vintage twist. Catch the latest posts in our Feed.
//         </p>
//       </section>

//       {/* Feed Section */}
//       <section
//         id="feed"
//         className="py-16 px-6 bg-[#FAF3E0] border-t-2 border-stone-400"
//       >
//         <h3 className="text-3xl font-bold uppercase mb-8 text-center tracking-widest">
//           The Daily Feed
//         </h3>
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {/* Example post card */}
//           <article className="border-2 border-stone-400 p-6 bg-[#FDF6E3] shadow-sm">
//             <h4 className="text-xl font-bold mb-2">Sample Post Title</h4>
//             <p className="text-sm text-stone-700">
//               This is a snippet of the blog post. Click to read more...
//             </p>
//             <button className="mt-4 text-stone-900 font-semibold hover:underline">
//               Read More →
//             </button>
//           </article>
//           {/* Later: map over real posts */}
//         </div>
//       </section>

//       {/* About Us Section */}
//       <section
//         id="about"
//         className="py-16 px-6 bg-[#FDF6E3] border-t-2 border-stone-400"
//       >
//         <h3 className="text-3xl font-bold uppercase mb-8 text-center tracking-widest">
//           About Us
//         </h3>
//         <p className="max-w-3xl mx-auto text-lg text-stone-700 leading-relaxed">
//           RetroBlog is inspired by vintage newspapers – bold headlines, simple
//           layouts, and timeless stories. We believe in bringing back the charm
//           of the past with the power of modern tech. Grab your coffee, and dive
//           into the latest!
//         </p>
//       </section>
//     </>
//   );
// }

// src/pages/Dashboard.jsx
import { useEffect } from "react";
import axiosClient from "../utils/axiosClient";
import useAuthStore from "../store/authStore";

export default function Dashboard() {
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

  return (
    <>
      {/* Landing Page / Hero */}
      <section className="h-[70vh] flex flex-col justify-center items-center text-center px-6">
        <h2 className="text-5xl font-bold uppercase mb-4 tracking-widest">
          Extra! Extra! Read All About It!
        </h2>
        <p className="text-lg max-w-xl text-stone-700">
          Welcome to <span className="font-bold">RetroBlog</span>, your digital
          newspaper with a vintage twist. Catch the latest posts in our Feed.
        </p>
      </section>

      {/* Feed Section */}
      {/* <section
        id="feed"
        className="py-16 px-6 bg-[#FAF3E0] border-t-2 border-stone-400"
      >
        <h3 className="text-3xl font-bold uppercase mb-8 text-center tracking-widest">
          The Daily Feed
        </h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article className="border-2 border-stone-400 p-6 bg-[#FDF6E3] shadow-sm">
            <h4 className="text-xl font-bold mb-2">Sample Post Title</h4>
            <p className="text-sm text-stone-700">
              This is a snippet of the blog post. Click to read more...
            </p>
            <button className="mt-4 text-stone-900 font-semibold hover:underline">
              Read More →
            </button>
          </article>
        </div>
      </section> */}

      {/* About Us Section */}
      <section
        id="about"
        className="py-16 px-6 bg-[#FDF6E3] border-t-2 border-stone-400"
      >
        <h3 className="text-3xl font-bold uppercase mb-8 text-center tracking-widest">
          About Us
        </h3>
        <p className="max-w-3xl mx-auto text-lg text-stone-700 leading-relaxed">
          RetroBlog is inspired by vintage newspapers – bold headlines, simple
          layouts, and timeless stories. We believe in bringing back the charm
          of the past with the power of modern tech. Grab your coffee, and dive
          into the latest!
        </p>
      </section>
      {/* Footer Section */}
      <footer className="py-8 bg-[#FAF3E0] text-center">
        <p className="text-sm text-stone-700">
          &copy; {new Date().getFullYear()} RetroBlog. All rights reserved.
        </p>
      </footer>
    </>
  );
}
