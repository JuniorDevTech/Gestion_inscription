import { Navigate } from "react-router-dom";

export default function GuestRoute({ children }) {
  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));

  /* NO TOKEN */
  if (!token || !user) {
    return children;
  }

  /* ADMIN */
  if (user.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  /* USER */
  return <Navigate to="/dashboard" replace />;
}
