import {
  fetchDashboardStart,
  fetchDashboardSuccess,
  fetchDashboardFailure,
  fetchFormationStatsStart,
  fetchFormationStatsSuccess,
  fetchFormationStatsFailure,
  fetchPaymentStatsStart,
  fetchPaymentStatsSuccess,
  fetchPaymentStatsFailure,
} from "./dashboardSlice";

import {
  getDashboardStatsAPI,
  getFormationStatsAPI,
  getPaymentStatsAPI,
} from "./dashboardAPI";

/* ================================================= */
/* ================= DASHBOARD ===================== */
/* ================================================= */

export const getDashboardStats = () => async (dispatch) => {
  try {
    dispatch(fetchDashboardStart());

    const data = await getDashboardStatsAPI();

    dispatch(fetchDashboardSuccess(data));
  } catch (error) {
    const message = error.response?.data?.message || "Erreur serveur";

    dispatch(fetchDashboardFailure(message));
  }
};

/* ================================================= */
/* ================= FORMATIONS ==================== */
/* ================================================= */

export const getFormationStats = () => async (dispatch) => {
  try {
    dispatch(fetchFormationStatsStart());

    const data = await getFormationStatsAPI();

    dispatch(fetchFormationStatsSuccess(data));
  } catch (error) {
    const message = error.response?.data?.message || "Erreur serveur";

    dispatch(fetchFormationStatsFailure(message));
  }
};

/* ================================================= */
/* ================= PAYMENT STATS ================= */
/* ================================================= */

export const getPaymentStats = () => async (dispatch) => {
  try {
    dispatch(fetchPaymentStatsStart());

    const data = await getPaymentStatsAPI();

    dispatch(fetchPaymentStatsSuccess(data));
  } catch (error) {
    const message = error.response?.data?.message || "Erreur serveur";

    dispatch(fetchPaymentStatsFailure(message));
  }
};
