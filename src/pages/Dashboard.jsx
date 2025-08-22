import { useEffect } from "react";
import axiosClient from "../utils/axiosClient";
import useAuthStore from "../store/authStore";

export default function Dashboard() {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosClient.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.error("User fetch failed", err);
      }
    };
    fetchUser();
  }, [setUser]);

  return (
    <div>
      <h2 className="text-2xl font-bold">Dashboard</h2>
      {user ? (
        <p>Welcome back, {user.username}!</p>
      ) : (
        <p className="italic">Loading user...</p>
      )}
    </div>
  );
}
