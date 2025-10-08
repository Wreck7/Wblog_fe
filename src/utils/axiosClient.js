
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://wblog-be.onrender.com/";

const axiosClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // always include cookies
});

// ✅ No need to inject Authorization headers anymore
axiosClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// ✅ Simplified refresh handling (backend uses cookies)
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // ask backend to refresh (it reads refresh_token cookie)
        await axios.post(`${API_URL}/auth/refresh`, {}, { withCredentials: true });

        // retry the original request
        return axiosClient(originalRequest);
      } catch (refreshError) {
        // refresh failed → log out
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
