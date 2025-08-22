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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          required
          className="w-full mb-4 px-3 py-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
          required
          className="w-full mb-4 px-3 py-2 border rounded"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={onChange}
          required
          className="w-full mb-4 px-3 py-2 border rounded"
        />
        <select
          name="gender"
          value={form.gender}
          onChange={onChange}
          className="w-full mb-4 px-3 py-2 border rounded"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={onChange}
          className="w-full mb-4"
        />

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
