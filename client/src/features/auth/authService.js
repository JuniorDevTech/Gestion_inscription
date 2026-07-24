import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "./authSlice";

import { loginAPI, registerAPI, verifyOTPAPI, getUsersAPI } from "./authAPI";
/* ================= SESSION ================= */
const SESSION_DURATION = 60 * 60 * 1000;

/* ================================================= */
/* ================= LOGIN USER ================= */
/* ================================================= */

export const loginUser = (formData) => async (dispatch) => {
  try {
    dispatch(loginStart());

    const data = await loginAPI(formData);

    /* CHECK RESPONSE */
    if (!data || !data.token || !data.user) {
      dispatch(loginFailure("Email ou mot de passe incorrect"));

      return {
        success: false,

        error: "Email ou mot de passe incorrect",
      };
    }

    /* SESSION */
    const expirationTime = Date.now() + SESSION_DURATION;

    /* STORAGE */
    localStorage.setItem("token", data.token);

    localStorage.setItem("user", JSON.stringify(data.user));

    localStorage.setItem("tokenExpiration", expirationTime);

    /* REDUX */
    dispatch(loginSuccess(data));

    return {
      success: true,
      data,
    };
  } catch (error) {
    const message = error.response?.data?.message || "Erreur serveur";

    dispatch(loginFailure(message));

    return {
      success: false,
      error: message,
    };
  }
};

/* ================================================= */
/* ================= REGISTER USER ================= */
/* ================================================= */

export const registerUser = (formData) => async (dispatch) => {
  try {
    dispatch(registerStart());

    const data = await registerAPI(formData);

    /* CHECK RESPONSE */
    if (!data || !data.email) {
      dispatch(registerFailure("Impossible de créer le compte"));

      return {
        success: false,

        error: "Impossible de créer le compte",
      };
    }

    /* REDUX ONLY */
    dispatch(registerSuccess(data));

    return {
      success: true,
      data,
    };
  } catch (error) {
    const message = error.response?.data?.message || "Erreur serveur";

    dispatch(registerFailure(message));

    return {
      success: false,
      error: message,
    };
  }
};

export const verifyOTP = (formData) => async (dispatch) => {
  try {
    dispatch(loginStart());

    const data = await verifyOTPAPI(formData);

    /* CHECK RESPONSE */
    if (!data || !data.token || !data.user) {
      dispatch(loginFailure("Code OTP invalide"));

      return {
        success: false,

        error: "Code OTP invalide",
      };
    }

    /* SESSION */
    const expirationTime = Date.now() + SESSION_DURATION;

    /* STORAGE */
    localStorage.setItem("token", data.token);

    localStorage.setItem("user", JSON.stringify(data.user));

    localStorage.setItem("tokenExpiration", expirationTime);

    /* REDUX */
    dispatch(loginSuccess(data));

    return {
      success: true,
      data,
    };
  } catch (error) {
    const message = error.response?.data?.message || "Erreur serveur";

    dispatch(loginFailure(message));

    return {
      success: false,

      error: message,
    };
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    dispatch(fetchUsersStart());

    const data = await getUsersAPI();

    dispatch(fetchUsersSuccess(data));
  } catch (error) {
    const message = error.response?.data?.message || "Erreur serveur";

    dispatch(fetchUsersFailure(message));
  }
};
