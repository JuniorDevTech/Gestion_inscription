import api from "../../services/api";

/* ================= LOGIN ================= */
export const loginAPI = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

/* ================= REGISTER ================= */
export const registerAPI = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

/* ================= GET CURRENT USER (/me) ================= */
export const getMeAPI = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  const response = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const verifyOTPAPI = async (data) => {
  const response = await api.post("/auth/verify-email", data);

  return response.data;
};

export const getUsersAPI = async () => {
  const response = await api.get("/auth/users");

  return response.data;
};
