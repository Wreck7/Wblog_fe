import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import axiosClient from "../../utils/axiosClient";
import defaultAvatar from "../../assets/default-avatar.jpg"; // ✅ correct name

export default function Signup() {
  const navigate = useNavigate();
  const setTokens = useAuthStore((s) => s.setTokens);
  const setUser = useAuthStore((s) => s.setUser);

  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    gender: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") setFile(files?.[0] || null);
    else setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("email", form.email);
      fd.append("password", form.password);
      fd.append("username", form.username);
      if (form.gender) fd.append("gender", form.gender);

      // ✅ Attach file or fallback to defaultAvatar
      if (file) {
        fd.append("file", file);
      } else {
        // fetch from assets (served by Vite as static file)
        const resp = await fetch(defaultAvatar);
        const blob = await resp.blob();
        fd.append(
          "file",
          new File([blob], "defaultAvatar.jpg", {
            type: blob.type || "image/jpeg",
          })
        );
      }

      // ✅ Send request like your working backend test
      const res = await axiosClient.post("/auth/signup", fd, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      // ✅ Save tokens and user
      setTokens(res.data.access_token, res.data.refresh_token);
      setUser(res.data.user);

      navigate("/"); // redirect
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      setError(err?.response?.data?.detail || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center max-h-screen bg-[#FDF6E3] font-[Georgia,serif] p-4 sm:p-6">
      <form
        onSubmit={handleSubmit}
        className="relative bg-[#FAF3E0] border-4 border-stone-800 p-6 sm:p-10 w-full max-w-sm sm:max-w-md shadow-[4px_4px_0px_#44403c] rounded-xl sm:rounded-2xl transition-transform duration-500 hover:scale-[1.01] sm:hover:scale-[1.02]"
      >
        {/* Retro Corner Decorations */}
        <div className="absolute -top-2 -left-2 w-3 h-3 sm:w-4 sm:h-4 border-t-4 border-l-4 border-stone-800"></div>
        <div className="absolute -top-2 -right-2 w-3 h-3 sm:w-4 sm:h-4 border-t-4 border-r-4 border-stone-800"></div>
        <div className="absolute -bottom-2 -left-2 w-3 h-3 sm:w-4 sm:h-4 border-b-4 border-l-4 border-stone-800"></div>
        <div className="absolute -bottom-2 -right-2 w-3 h-3 sm:w-4 sm:h-4 border-b-4 border-r-4 border-stone-800"></div>

        <h2 className="text-2xl sm:text-3xl font-extrabold mb-8 sm:mb-10 text-center text-stone-800 uppercase tracking-[0.2em] sm:tracking-[0.25em] animate-bounce">
          Sign Up!
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Your Public Moniker"
          value={form.username}
          onChange={onChange}
          required
          className="w-full bg-transparent border-b-4 border-stone-800 py-2 sm:py-3 mb-6 sm:mb-8 placeholder-stone-500 text-stone-900 text-base sm:text-lg focus:outline-none focus:border-stone-600 transition-all duration-300 animate-[pulse_2s_infinite]"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Electronic Mail"
          value={form.email}
          onChange={onChange}
          required
          className="w-full bg-transparent border-b-4 border-stone-800 py-2 sm:py-3 mb-6 sm:mb-8 placeholder-stone-500 text-stone-900 text-base sm:text-lg focus:outline-none focus:border-stone-600 transition-all duration-300 animate-[pulse_2s_infinite]"
        />

        <input
          type="password"
          name="password"
          placeholder="Your Secret Passcode"
          value={form.password}
          onChange={onChange}
          required
          className="w-full bg-transparent border-b-4 border-stone-800 py-2 sm:py-3 mb-6 sm:mb-8 placeholder-stone-500 text-stone-900 text-base sm:text-lg focus:outline-none focus:border-stone-600 transition-all duration-300 animate-[pulse_2s_infinite]"
        />

        <select
          name="gender"
          value={form.gender}
          onChange={onChange}
          required
          className="w-full bg-transparent border-b-4 border-stone-800 py-2 sm:py-3 mb-6 sm:mb-8 text-stone-900 text-base sm:text-lg focus:outline-none focus:border-stone-600 transition-all duration-300"
        >
          <option value="">Select Gender...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={onChange}
          className="w-full mb-6 sm:mb-8 text-sm text-stone-600 file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-sm file:font-semibold file:bg-stone-800 file:text-stone-50 hover:file:bg-stone-700"
        />

        {error && (
          <p className="text-red-800 mb-4 sm:mb-6 text-center font-bold animate-pulse text-sm sm:text-base">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="relative w-full bg-stone-800 text-stone-50 py-3 sm:py-4 uppercase tracking-[0.15em] sm:tracking-[0.2em] font-extrabold rounded-md sm:rounded-lg shadow-[3px_3px_0px_#44403c] sm:shadow-[4px_4px_0px_#44403c] hover:shadow-[5px_5px_0px_#1c1917] hover:scale-105 transition-transform duration-300 disabled:bg-stone-500 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          {loading ? "Transmitting..." : "Signup"}
        </button>

        <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-center text-stone-700">
          Already in the club?{" "}
          <Link
            to="/login"
            className="text-stone-900 font-extrabold hover:underline hover:text-stone-700 transition-colors duration-300"
          >
            Login Here
          </Link>
        </p>
      </form>
    </div>
  );
}
