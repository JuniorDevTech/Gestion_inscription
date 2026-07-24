import {
  fetchStatsStart,
  fetchStatsSuccess,
  fetchStatsFailure,
  fetchRecentStart,
  fetchRecentSuccess,
  fetchRecentFailure,
  fetchInscriptionsStart,
  fetchInscriptionsSuccess,
  fetchInscriptionsFailure,
  fetchInscriptionStart,
  fetchInscriptionSuccess,
  fetchInscriptionFailure,
  createInscriptionStart,
  createInscriptionSuccess,
  createInscriptionFailure,
} from "./inscriptionSlice";

import {
  getInscriptionStatsAPI,
  getRecentInscriptionsAPI,
  getInscriptionsAPI,
  getInscriptionByIdAPI,
  createInscriptionAPI,
  getMyInscriptionsAPI,
} from "./inscriptionAPI";

/* ================================================= */
/* ================= GET STATS ===================== */
/* ================================================= */

export const getInscriptionStats = () => async (dispatch) => {
  try {
    dispatch(fetchStatsStart());

    const data = await getInscriptionStatsAPI();

    dispatch(fetchStatsSuccess(data));
  } catch (error) {
    const message = error.response?.data?.message || "Erreur serveur";

    dispatch(fetchStatsFailure(message));
  }
};

/* ================================================= */
/* ================= GET RECENT ==================== */
/* ================================================= */

export const getRecentInscriptions = () => async (dispatch) => {
  try {
    dispatch(fetchRecentStart());

    const data = await getRecentInscriptionsAPI();

    dispatch(fetchRecentSuccess(data));
  } catch (error) {
    const message = error.response?.data?.message || "Erreur serveur";

    dispatch(fetchRecentFailure(message));
  }
};
/* ================================================= */
/* ================= GET ALL ======================= */
/* ================================================= */

export const getInscriptions = () => async (dispatch) => {
  try {
    dispatch(fetchInscriptionsStart());

    const data = await getInscriptionsAPI();

    dispatch(fetchInscriptionsSuccess(data.inscriptions));
  } catch (error) {
    const message = error.response?.data?.message || "Erreur serveur";

    dispatch(fetchInscriptionsFailure(message));
  }
};

/* ================================================= */
/* ================= GET BY ID ===================== */
/* ================================================= */

export const getInscriptionById = (id) => async (dispatch) => {
  try {
    dispatch(fetchInscriptionStart());

    const data = await getInscriptionByIdAPI(id);

    dispatch(fetchInscriptionSuccess(data.inscription || data));
  } catch (error) {
    const message = error.response?.data?.message || "Erreur serveur";

    dispatch(fetchInscriptionFailure(message));
  }
};

/* ================================================= */
/* ================= CREATE ======================== */
/* ================================================= */

export const createInscription = (formData) => async (dispatch) => {
  try {
    dispatch(createInscriptionStart());

    const data = await createInscriptionAPI(formData);

    dispatch(createInscriptionSuccess(data.inscription));

    return {
      success: true,
    };
  } catch (error) {
    dispatch(createInscriptionFailure(error.response?.data?.message));

    return {
      success: false,

      error: error.response?.data?.message,
    };
  }
};

export const getMyInscriptions = () => async (dispatch) => {
  try {
    dispatch(fetchInscriptionsStart());

    const data = await getMyInscriptionsAPI();

    dispatch(fetchInscriptionsSuccess(data.inscriptions));
  } catch (error) {
    dispatch(
      fetchInscriptionsFailure(
        error.response?.data?.message || "Erreur serveur",
      ),
    );
  }
};
