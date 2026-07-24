import api from "../../services/api";

/* ================================================= */
/* ================= CREATE FORMATION ============== */
/* ================================================= */

export const createFormationAPI = async (formData) => {
  const response = await api.post("/formations", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/* ================================================= */
/* ================= GET FORMATIONS ================ */
/* ================================================= */

export const getFormationsAPI = async () => {
  const response = await api.get("/formations");

  return response.data;
};

/* ================================================= */
/* ================= UPDATE FORMATION ============== */
/* ================================================= */

export const updateFormationAPI = async (id, formData) => {
  const response = await api.put(`/formations/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/* ================================================= */
/* ================= DELETE FORMATION ============== */
/* ================================================= */

export const deleteFormationAPI = async (id) => {
  const response = await api.delete(`/formations/${id}`);

  return response.data;
};
