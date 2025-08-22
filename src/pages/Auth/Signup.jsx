import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import axiosClient from "../../utils/axiosClient";
import defaultAvatar from "../../assets/default-avatar.jpg";

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
      // These names MUST match your FastAPI Form(...) params
      fd.append("email", form.email);
      fd.append("password", form.password);
      fd.append("username", form.username);
      if (form.gender) fd.append("gender", form.gender);

      // image optional; if none, attach defaultAvatar.jpg from assets
      if (file) {
        fd.append("file", file);
      } else {
        // turn imported asset URL into a File
        const resp = await fetch(defaultAvatar);
        const blob = await resp.blob();
        const fallback = new File([blob], "default-avatar.jpg", {
          type: blob.type || "image/jpeg",
        });
        fd.append("file", fallback);
      }

      // Axios will set proper multipart boundary automatically; no need to set headers
      const res = await axiosClient.post("/auth/signup", fd);

      // your store logic (as used in Login)
      setTokens(res.data.access_token, res.data.refresh_token);
      setUser(res.data.user);

      // go to home/Dashboard (you said login goes to "/")
      navigate("/");
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Signup failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="w-full max-w-md bg-white border border-neutral-300 shadow-lg p-6">
        <h2 className="text-3xl font-serif font-bold text-center tracking-wide mb-4">
          Create Account
        </h2>

        {error && (
          <div className="mb-3 text-sm text-red-600 border border-red-200 bg-red-50 p-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={onChange}
            className="w-full border border-neutral-400 px-3 py-2 focus:outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
            className="w-full border border-neutral-400 px-3 py-2 focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            className="w-full border border-neutral-400 px-3 py-2 focus:outline-none"
            required
          />
          <select
            name="gender"
            value={form.gender}
            onChange={onChange}
            className="w-full border border-neutral-400 px-3 py-2 focus:outline-none"
          >
            <option value="">Select Gender (optional)</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <div className="space-y-1">
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={onChange}
              className="w-full border border-neutral-400 px-3 py-2 focus:outline-none"
            />
            {!file && (
              <p className="text-xs text-neutral-500">
                No image chosen — we’ll use your default avatar.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-neutral-900 text-white py-2 hover:bg-neutral-700"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
