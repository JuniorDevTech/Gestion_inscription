import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { UserRound, Clock3, ArrowUpRight } from "lucide-react";

import { getRecentInscriptions } from "../../features/inscription/inscriptionService";

export default function RecentInscriptionCard() {
  const dispatch = useDispatch();

  const { recentInscriptions, recentLoading } = useSelector(
    (state) => state.inscriptions,
  );

  /* ================================================= */
  /* ================= FETCH ========================= */
  /* ================================================= */

  useEffect(() => {
    dispatch(getRecentInscriptions());
  }, [dispatch]);

  /* ================================================= */
  /* ================= LOADING ======================= */
  /* ================================================= */

  if (recentLoading) {
    return <div className="bg-white rounded-[28px] p-6">Chargement...</div>;
  }

  return (
    <div
      className="
        relative overflow-hidden
        bg-white
        rounded-[28px]
        border border-slate-200
        shadow-sm
        p-6
      ">
      {/* BACKGROUND */}
      <div
        className="
          absolute -top-10 -right-10
          w-40 h-40
          bg-indigo-100/70
          rounded-full
          blur-3xl
        "
      />

      {/* HEADER */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Étudiants récemment inscrits
          </h2>

          <p className="text-slate-500 text-sm mt-1">
            Liste des nouveaux étudiants
          </p>
        </div>

        <button
          className="
            flex items-center gap-2
            text-sm font-semibold
            text-indigo-600
          ">
          Voir plus
          <ArrowUpRight size={16} />
        </button>
      </div>

      {/* LIST */}
      <div className="relative z-10 space-y-4">
        {recentInscriptions.map((item) => (
          <div
            key={item._id}
            className="
              group
              flex items-center justify-between
              gap-4
              p-4
              rounded-2xl
              border border-slate-200
              hover:border-indigo-200
              hover:bg-slate-50
              transition-all duration-300
            ">
            {/* LEFT */}
            <div className="flex items-center gap-4 min-w-0">
              {/* AVATAR */}
              <div
                className="
                  w-14 h-14 rounded-2xl
                  bg-indigo-100
                  flex items-center justify-center
                ">
                <UserRound size={24} className="text-indigo-600" />
              </div>

              {/* TEXT */}
              <div className="min-w-0">
                <h3 className="font-semibold text-slate-800 truncate">
                  {item.firstName} {item.lastName}
                </h3>

                <p className="text-sm text-slate-500 truncate mt-1">
                  Étudiant inscrit récemment
                </p>

                <div className="flex items-center gap-1 mt-2">
                  <Clock3 size={14} className="text-slate-400" />

                  <span className="text-xs text-slate-400">
                    {new Date(item.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
              </div>
            </div>

            {/* BADGE */}
            <span
              className="
                shrink-0
                px-4 py-1.5
                rounded-full
                bg-indigo-100
                text-indigo-700
                text-xs font-semibold
              ">
              Nouveau
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
