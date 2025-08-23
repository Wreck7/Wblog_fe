import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,

  setTokens: (access, refresh) =>
    set(() => {
      // Save to localStorage as fallback if cookies fail
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

  setUser: (user) => set({ user }),

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    set({ user: null, accessToken: null, refreshToken: null });
  },
}));

export default useAuthStore;


// import { create } from "zustand";

// const useAuthStore = create((set) => ({
//   user: null,

//   setUser: (user) => set({ user }),

//   logout: () => {
//     set({ user: null });
//     // Optionally call backend logout API to clear cookies
//   },
// }));

// export default useAuthStore;
