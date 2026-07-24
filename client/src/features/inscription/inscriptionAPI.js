import api from "../../services/api";

/* ================================================= */
/* ================= GET STATS ===================== */
/* ================================================= */

export const getInscriptionStatsAPI = async () => {
  const response = await api.get("/inscriptions/stats");

  return response.data;
};

/* ================================================= */
/* ================= GET RECENT ==================== */
/* ================================================= */

export const getRecentInscriptionsAPI = async () => {
  const response = await api.get("/inscriptions/recent");

  return response.data;
};

/* ================================================= */
/* ================= GET INSCRIPTIONS ============== */
/* ================================================= */

export const getInscriptionsAPI = async () => {
  const response = await api.get("/inscriptions");

  return response.data;
};

/* ================================================= */
/* ================= GET ONE ======================= */
/* ================================================= */

export const getInscriptionByIdAPI = async (id) => {
  const response = await api.get(`/inscriptions/${id}`);

  return response.data;
};

/* ================================================= */
/* ================= CREATE ======================== */
/* ================================================= */

export const createInscriptionAPI = async (formData) => {
  const response = await api.post("/inscriptions", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/* ================================================= */
/* ================= UPDATE ======================== */
/* ================================================= */

export const updateInscriptionAPI = async (id, formData) => {
  const response = await api.put(`/inscriptions/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/* ================================================= */
/* ================= DELETE ======================== */
/* ================================================= */

export const deleteInscriptionAPI = async (id) => {
  const response = await api.delete(`/inscriptions/${id}`);

  return response.data;
};

export const getMyInscriptionsAPI = async () => {
  const response = await api.get("/inscriptions/me");

  return response.data;
};
