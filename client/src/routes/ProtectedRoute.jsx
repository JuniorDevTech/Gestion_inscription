import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  const expiration = localStorage.getItem("tokenExpiration");

  const user = localStorage.getItem("user");

  /* ================= NO TOKEN ================= */
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  /* ================= NO USER ================= */
  if (!user) {
    localStorage.removeItem("token");

    localStorage.removeItem("tokenExpiration");

    return <Navigate to="/login" replace />;
  }

  /* ================= NO EXPIRATION ================= */
  if (!expiration) {
    localStorage.clear();

    return <Navigate to="/login" replace />;
  }

  /* ================= CHECK EXPIRATION ================= */
  // eslint-disable-next-line react-hooks/purity
  const isExpired = Date.now() > Number(expiration);

  if (isExpired) {
    localStorage.clear();

    return <Navigate to="/login" replace />;
  }

  /* ================= ACCESS GRANTED ================= */
  return children;
}
