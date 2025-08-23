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
    <div className="flex items-center justify-center max-h-screen bg-[#FDF6E3] font-serif p-4">
  {/* ^-- This 'min-h-screen' class makes the container fill the viewport height */}
  <form
    onSubmit={handleSubmit}
    className="bg-[#FAF3E0] border-2 border-stone-400 p-8 w-full max-w-md shadow-lg"
  >
    <h2 className="text-3xl font-bold mb-8 text-center text-stone-800 uppercase tracking-widest">
      Sign Up!
    </h2>

    <input
      type="email"
      name="email"
      placeholder="Your Electronic Mail"
      value={form.email}
      onChange={onChange}
      required
      className="w-full bg-transparent border-b-2 border-stone-400 py-2 mb-6 focus:outline-none focus:border-stone-800"
    />
    <input
      type="password"
      name="password"
      placeholder="Your Secret Passcode"
      value={form.password}
      onChange={onChange}
      required
      className="w-full bg-transparent border-b-2 border-stone-400 py-2 mb-6 focus:outline-none focus:border-stone-800"
    />
    <input
      type="text"
      name="username"
      placeholder="Your Public Moniker"
      value={form.username}
      onChange={onChange}
      required
      className="w-full bg-transparent border-b-2 border-stone-400 py-2 mb-6 focus:outline-none focus:border-stone-800"
    />
    <select
      name="gender"
      value={form.gender}
      onChange={onChange}
      className="w-full bg-transparent border-b-2 border-stone-400 py-2 mb-6 focus:outline-none focus:border-stone-800 appearance-none"
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
      className="w-full mb-6 text-sm text-stone-600 file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-sm file:font-semibold file:bg-stone-800 file:text-stone-50 hover:file:bg-stone-700"
    />

    {error && <p className="text-red-800 mb-4 text-center">{error}</p>}

    <button
      type="submit"
      disabled={loading}
      className="w-full bg-stone-800 text-stone-50 py-3 uppercase tracking-wider font-semibold hover:bg-stone-700 disabled:bg-stone-500 disabled:cursor-not-allowed transition-colors duration-300"
    >
      {loading ? "Transmitting..." : "Signup"}
    </button>

    <p className="mt-6 text-sm text-center text-stone-700">
      Already in the club?{" "}
      <Link to="/login" className="text-stone-900 font-bold hover:underline">
        Login Here
      </Link>
    </p>
  </form>
</div>
  );
}
