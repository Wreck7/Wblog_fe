import axios from "axios";
import useAuthStore from "../store/authStore";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const axiosClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // allow httpOnly cookies
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = useAuthStore.getState().refreshToken;
        if (!refreshToken) throw new Error("No refresh token");

        const res = await axios.post(`${API_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        });

        useAuthStore.getState().setTokens(res.data.access, res.data.refresh);

        axiosClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.access}`;

        originalRequest.headers["Authorization"] = `Bearer ${res.data.access}`;

        return axiosClient(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
