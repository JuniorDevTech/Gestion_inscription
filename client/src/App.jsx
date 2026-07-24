import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import { setUser } from "./features/auth/authSlice";
import { getMeAPI } from "./features/auth/authAPI";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const syncUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const data = await getMeAPI();
        dispatch(setUser(data.user));
      } catch (err) {
        console.log("Sync /me error:", err);

        // token invalide → cleanup
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    };

    syncUser();
  }, [dispatch]);

  return <AppRoutes />;
}
