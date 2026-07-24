import { useEffect, useState } from "react";

import { getMeAPI } from "../../features/auth/authAPI";

import UserTotalFormationCard from "../../components/usercomponent/dashboard/UserTotalFormationCard";

import UserPendingFormationCard from "../../components/usercomponent/dashboard/UserPendingFormationCard";

import UserApprovedFormationCard from "../../components/usercomponent/dashboard/UserApprovedFormationCard";

import UserlisteFormation from "../../components/usercomponent/dashboard/UserlisteFormation";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMeAPI();

        setUser(data.user);
      } catch (err) {
        console.log("Erreur getMe:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

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

  if (!user) {
    return (
      <div
        className="
          bg-red-50
          border border-red-200
          text-red-700
          rounded-2xl
          p-6
        ">
        Utilisateur introuvable
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ================================================= */}
      {/* ================= WELCOME ======================= */}
      {/* ================================================= */}

      <div
        className="
          bg-white
          rounded-[28px]
          border border-slate-200
          shadow-sm
          p-6
        ">
        <h1
          className="
            text-3xl
            font-black
            text-slate-800
          ">
          Bonjour {user.firstName} 👋
        </h1>

        <p className="text-slate-500 mt-2">
          Bienvenue sur votre espace étudiant
        </p>
      </div>

      {/* ================================================= */}
      {/* ================= STATS ========================= */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <UserTotalFormationCard />

        <UserPendingFormationCard />

        <UserApprovedFormationCard />

        <UserlisteFormation />
      </div>
    </div>
  );
}
