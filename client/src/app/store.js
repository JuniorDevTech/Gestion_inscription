import { configureStore } from "@reduxjs/toolkit";

/* AUTH */
import authReducer from "../features/auth/authSlice";

/* FORMATIONS */
import formationReducer from "../features/formations/formationSlice";

/* INSCRIPTIONS */
import inscriptionReducer from "../features/inscription/inscriptionSlice";

/* DOCUMENTS */
import documentReducer from "../features/documents/documentSlice";

/* PAYMENTS */
import paymentReducer from "../features/payments/paymentSlice";

/* REPORTS */
import reportReducer from "../features/reports/reportSlice";

/* DASHBORARD */
import dashboardReducer from "../features/dashboardAdmin/dashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    dashboard: dashboardReducer,

    formations: formationReducer,

    inscriptions: inscriptionReducer,

    documents: documentReducer,

    payments: paymentReducer,

    reports: reportReducer,
  },

  devTools: true,
});
