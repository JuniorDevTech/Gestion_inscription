import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import DashboardHeader from "../../components/dashboardAdmis/DashboardHeader";

import StatsCard from "../../components/dashboardAdmis/StatsCard";

import FormationChart from "../../components/dashboardAdmis/FormationChart";

import InscriptionStatusChart from "../../components/dashboardAdmis/InscriptionStatusChart";

import PaymentStatusChart from "../../components/dashboardAdmis/PaymentStatusChart";

import RecentInscriptionCard from "../../components/dashboardAdmis/RecentInscriptionCard";

import { Users, BadgeCheck, CreditCard, Clock3 } from "lucide-react";

import { getDashboardStats } from "../../features/dashboardAdmin/dashboardService";

export default function AdminDashboard() {
  const dispatch = useDispatch();

  const { stats, loading, error } = useSelector((state) => state.dashboard);

  /* ================================================= */
  /* ================= FETCH DASHBOARD =============== */
  /* ================================================= */

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  /* ================================================= */
  /* ================= LOADING ======================= */
  /* ================================================= */

  if (loading) {
    return (
      <div
        className="
          flex items-center justify-center
          min-h-[500px]
          text-slate-500
          text-lg font-medium
        ">
        Chargement du dashboard...
      </div>
    );
  }

  /* ================================================= */
  /* ================= ERROR ========================= */
  /* ================================================= */

  if (error) {
    return (
      <div
        className="
          bg-red-50
          border border-red-200
          text-red-700
          rounded-2xl
          p-6
        ">
        {error}
      </div>
    );
  }

  /* ================================================= */
  /* ================= EMPTY ========================= */
  /* ================================================= */

  if (!stats) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* ================================================= */}
      {/* ================= HEADER ======================== */}
      {/* ================================================= */}

      <DashboardHeader />

      {/* ================================================= */}
      {/* ================= STATS ========================= */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatsCard
          title="Total inscriptions"
          value={stats.totalInscriptions || 0}
          icon={Users}
          color="bg-gradient-to-br from-blue-500 to-cyan-500"
          growth={stats.totalGrowth || 0}
          subtitle="ce mois-ci"
        />

        <StatsCard
          title="Inscriptions Validées"
          value={stats.validated || 0}
          icon={BadgeCheck}
          color="bg-gradient-to-br from-emerald-500 to-green-600"
          growth={stats.validatedGrowth || 0}
          subtitle="ce mois-ci"
        />

        <StatsCard
          title="En attente"
          value={stats.pending || 0}
          icon={Clock3}
          color="bg-gradient-to-br from-amber-400 to-orange-500"
          growth={stats.pendingGrowth || 0}
          subtitle="ce mois-ci"
        />

        <StatsCard
          title="Paiements Reçus"
          value={stats.payments || 0}
          icon={CreditCard}
          color="bg-gradient-to-br from-emerald-500 to-teal-600"
          growth={stats.paymentGrowth || 0}
          subtitle="ce mois-ci"
        />
      </div>

      {/* ================================================= */}
      {/* ================= CHARTS ======================= */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <FormationChart />

        <InscriptionStatusChart />
      </div>

      {/* ================================================= */}
      {/* ================= BOTTOM ======================= */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <PaymentStatusChart />
        </div>

        <RecentInscriptionCard />
      </div>
    </div>
  );
}
