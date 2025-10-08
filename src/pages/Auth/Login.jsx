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
      Welcome Back!
    </h2>

    <input
      type="email"
      name="email"
      placeholder="Your Electronic Mail"
      value={form.email}
      onChange={handleChange}
      required
      className="w-full bg-transparent border-b-4 border-stone-800 py-2 sm:py-3 mb-6 sm:mb-8 placeholder-stone-500 text-stone-900 text-base sm:text-lg focus:outline-none focus:border-stone-600 transition-all duration-300 animate-[pulse_2s_infinite]"
    />
    <input
      type="password"
      name="password"
      placeholder="Your Secret Passcode"
      value={form.password}
      onChange={handleChange}
      required
      className="w-full bg-transparent border-b-4 border-stone-800 py-2 sm:py-3 mb-6 sm:mb-8 placeholder-stone-500 text-stone-900 text-base sm:text-lg focus:outline-none focus:border-stone-600 transition-all duration-300 animate-[pulse_2s_infinite]"
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
      {loading ? "Authenticating..." : "Login"}
    </button>

    <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-center text-stone-700">
      New to the club?{" "}
      <Link
        to="/signup"
        className="text-stone-900 font-extrabold hover:underline hover:text-stone-700 transition-colors duration-300"
      >
        Sign Up Here
      </Link>
    </p>
  </form>
</div>


  );
}
