import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ================= ROUTE PROTECTION ================= */
import GuestRoute from "../components/common/GuestRoute";

import ProtectedRoute from "./ProtectedRoute";

import AdminRoute from "./AdminRoute";

/* ================= LAYOUTS ================= */
import MainLayout from "../layouts/MainLayout";

import AuthLayout from "../layouts/AuthLayout";

import DashboardLayout from "../layouts/DashboardLayout";

import AdminLayout from "../layouts/AdminLayout";

/* ================= PAGES ================= */
import Home from "../pages/Home";

/* ================= AUTH ================= */
import Login from "../pages/auth/Login";

import Register from "../pages/auth/Register";

import VerifyEmail from "../pages/auth/VerifyEmail";

/* ================= USER ================= */
import UserDashboard from "../pages/dashboard/UserDashboard";

import UserFormation from "../pages/user/userFormation";

import UserDocument from "../pages/user/userDocument";

import UserInscriptionforma from "../pages/user/userInscriptionforma";

import InscriptionDetails from "../components/inscriptions/InscriptionDetails";

/* ================= ADMIN ================= */
import AdminDashboard from "../pages/dashboard/AdminDashboard";

import ManageInscriptions from "../pages/admin/ManageInscriptions";

import ManageFormations from "../pages/admin/ManageFormations";

import Reports from "../pages/admin/Reports";

/* ================= ERROR ================= */
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================================================= */}
        {/* ================= PUBLIC ROUTES ================= */}
        {/* ================================================= */}

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* ================================================= */}
        {/* ================= AUTH ROUTES ================= */}
        {/* ================================================= */}

        <Route element={<AuthLayout />}>
          {/* LOGIN */}
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />

          {/* REGISTER */}
          <Route
            path="/register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />

          {/* VERIFY EMAIL */}
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Route>

        {/* ================================================= */}
        {/* ================= USER ROUTES ================= */}
        {/* ================================================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
          {/* PAGE PAR DÉFAUT */}
          <Route index element={<UserDashboard />} />

          {/* ADMIN User */}
          <Route path="dashboard" element={<UserDashboard />} />

          {/* FORMATIONS */}
          <Route path="formations" element={<UserFormation />} />

          {/* DOCUMENTS */}
          <Route path="documents" element={<UserDocument />} />

          {/* INSCRIPTION */}
          <Route path="inscription" element={<UserInscriptionforma />} />
        </Route>

        {/* ================================================= */}
        {/* ================= ADMIN ROUTES ================= */}
        {/* ================================================= */}

        <Route
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }>
          {/* ADMIN DASHBOARD */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* INSCRIPTIONS */}
          <Route path="/admin/inscriptions" element={<ManageInscriptions />} />

          {/* INSCRIPTION DETAILS */}
          <Route
            path="/admin/inscriptions/:id"
            element={<InscriptionDetails />}
          />

          {/* FORMATIONS */}
          <Route path="/admin/formations" element={<ManageFormations />} />

          {/* REPORTS */}
          <Route path="/admin/reports" element={<Reports />} />
        </Route>

        {/* ================================================= */}
        {/* ================= 404 ROUTE ================= */}
        {/* ================================================= */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
