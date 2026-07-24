import axios from "axios";

/* AXIOS INSTANCE */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

/* REQUEST INTERCEPTOR */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

/* RESPONSE INTERCEPTOR */
api.interceptors.response.use(
  (response) => response,

  (error) => {
    /* TOKEN EXPIRED */
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
