import {
  createFormationStart,
  createFormationSuccess,
  createFormationFailure,
  fetchFormationsStart,
  fetchFormationsSuccess,
  fetchFormationsFailure,
  updateFormationStart,
  updateFormationSuccess,
  deleteFormationStart,
  deleteFormationSuccess,
  deleteFormationFailure,
} from "./formationSlice";

import {
  createFormationAPI,
  getFormationsAPI,
  updateFormationAPI,
  deleteFormationAPI,
} from "./formationAPI";

/* ================================================= */
/* ================= CREATE FORMATION ============== */
/* ================================================= */

export const createFormation = (formData) => async (dispatch) => {
  try {
    dispatch(createFormationStart());

    const data = await createFormationAPI(formData);

    dispatch(createFormationSuccess(data.formation));

    return {
      success: true,

      data,
    };
  } catch (error) {
    const message = error.response?.data?.message || "Erreur serveur";

    dispatch(createFormationFailure(message));

    return {
      success: false,

      error: message,
    };
  }
};

export const getFormations = () => async (dispatch) => {
  try {
    dispatch(fetchFormationsStart());

    const data = await getFormationsAPI();

    dispatch(fetchFormationsSuccess(data.formations));

    return {
      success: true,

      data,
    };
  } catch (error) {
    const message = error.response?.data?.message || "Erreur serveur";

    dispatch(fetchFormationsFailure(message));

    return {
      success: false,

      error: message,
    };
  }
};

/* ================================================= */
/* ================= UPDATE FORMATION ============== */
/* ================================================= */

export const updateFormation = (id, formData) => async (dispatch) => {
  try {
    dispatch(updateFormationStart());

    const data = await updateFormationAPI(id, formData);

    dispatch(updateFormationSuccess(data.formation));

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,

      error: error.response?.data?.message,
    };
  }
};
/* ================================================= */
/* ================= DELETE FORMATION ============== */
/* ================================================= */

export const deleteFormation = (id) => async (dispatch) => {
  try {
    dispatch(deleteFormationStart());

    await deleteFormationAPI(id);

    dispatch(deleteFormationSuccess(id));

    return {
      success: true,
    };
  } catch (error) {
    const message = error.response?.data?.message || "Erreur serveur";

    dispatch(deleteFormationFailure(message));

    return {
      success: false,
      error: message,
    };
  }
};
