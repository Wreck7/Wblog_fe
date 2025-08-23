import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import axiosClient from "../../utils/axiosClient";

export default function Login() {
  const navigate = useNavigate();
  const { setTokens, setUser } = useAuthStore();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axiosClient.post("/auth/login", form); // ✅ send JSON

      setTokens(res.data.access_token, res.data.refresh_token);
      setUser(res.data.user);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center max-h-screen bg-[#FDF6E3] font-serif p-4">
  <form
    onSubmit={handleSubmit}
    className="bg-[#FAF3E0] border-2 border-stone-400 p-8 w-full max-w-md shadow-lg"
  >
    <h2 className="text-3xl font-bold mb-8 text-center text-stone-800 uppercase tracking-widest">
      Welcome Back!
    </h2>

    <input
      type="email"
      name="email"
      placeholder="Your Electronic Mail"
      value={form.email}
      onChange={handleChange}
      required
      className="w-full bg-transparent border-b-2 border-stone-400 py-2 mb-6 focus:outline-none focus:border-stone-800"
    />
    <input
      type="password"
      name="password"
      placeholder="Your Secret Passcode"
      value={form.password}
      onChange={handleChange}
      required
      className="w-full bg-transparent border-b-2 border-stone-400 py-2 mb-6 focus:outline-none focus:border-stone-800"
    />

    {error && <p className="text-red-800 mb-4 text-center">{error}</p>}

    <button
      type="submit"
      disabled={loading}
      className="w-full bg-stone-800 text-stone-50 py-3 uppercase tracking-wider font-semibold hover:bg-stone-700 disabled:bg-stone-500 disabled:cursor-not-allowed transition-colors duration-300"
    >
      {loading ? "Authenticating..." : "Login"}
    </button>

    <p className="mt-6 text-sm text-center text-stone-700">
      New to the club?{" "}
      <Link to="/signup" className="text-stone-900 font-bold hover:underline">
        Sign Up Here
      </Link>
    </p>
  </form>
</div>
  );
}
