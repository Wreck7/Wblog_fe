

import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,

  setTokens: (access, refresh) =>
    set(() => {
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      return { accessToken: access, refreshToken: refresh };
    }),

  loadTokens: () =>
    set(() => {
      const access = localStorage.getItem("accessToken");
      const refresh = localStorage.getItem("refreshToken");
      return { accessToken: access, refreshToken: refresh };
    }),

  setUser: (user) =>
    set(() => {
      localStorage.setItem("user", JSON.stringify(user));
      return { user };
    }),

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    set({ user: null, accessToken: null, refreshToken: null });
  },
}));

export default useAuthStore;
