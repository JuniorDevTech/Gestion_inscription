import { Navigate } from "react-router-dom";

import HeroSection from "../components/home/HeroSection";

import FeaturesSection from "../components/home/FeaturesSection";

import FormationSection from "../components/home/FormationSection";

import CTASection from "../components/home/CTASection";

export default function Home() {
  /* TOKEN */
  const token = localStorage.getItem("token");

  /* USER */
  const user = JSON.parse(localStorage.getItem("user"));

  /* EXPIRATION */
  const expiration = localStorage.getItem("tokenExpiration");

  /* ================= CHECK SESSION ================= */

  if (token && user && expiration) {
    // eslint-disable-next-line react-hooks/purity
    const isExpired = Date.now() > Number(expiration);

    /* SESSION EXPIRED */
    if (isExpired) {
      localStorage.clear();
    } else {
      /* ADMIN */
      if (user.role === "admin") {
        return <Navigate to="/admin/dashboard" replace />;
      }

      /* USER */
      return <Navigate to="/dashboard" replace />;
    }
  }

  /* ================= HOME PAGE ================= */
  return (
    <div className="bg-gray-100">
      <HeroSection />

      <FeaturesSection />

      <FormationSection />

      <CTASection />
    </div>
  );
}
