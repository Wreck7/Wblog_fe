import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fdf6e3] font-serif">
      <div className="w-full max-w-md bg-white p-6 shadow-xl border border-black">
        <Outlet />
      </div>
    </div>
  );
}
