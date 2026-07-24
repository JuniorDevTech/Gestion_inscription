import api from "../../services/api";

/* ================================================= */
/* ================= DASHBOARD STATS =============== */
/* ================================================= */

export const getDashboardStatsAPI = async () => {
  const response = await api.get("/dashboard/stats");

  return response.data;
};

/* ================================================= */
/* ================= FORMATIONS ==================== */
/* ================================================= */

export const getFormationStatsAPI = async () => {
  const response = await api.get("/dashboard/formations");

  return response.data;
};

/* ================================================= */
/* ================= PAYMENTS ====================== */
/* ================================================= */
export const getPaymentStatsAPI = async () => {
  const response = await api.get("/dashboard/payments");

  return response.data;
};
