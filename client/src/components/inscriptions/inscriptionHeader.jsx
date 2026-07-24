import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Users, Sparkles, GraduationCap } from "lucide-react";

import { getDashboardStats } from "../../features/dashboardAdmin/dashboardService";

import { getFormationStats } from "../../features/dashboardAdmin/dashboardService";

export default function InscriptionHeader() {
  const dispatch = useDispatch();

  const { stats, formationStats } = useSelector((state) => state.dashboard);

  /* ================================================= */
  /* ================= FETCH ========================= */
  /* ================================================= */

  useEffect(() => {
    dispatch(getDashboardStats());

    dispatch(getFormationStats());
  }, [dispatch]);

  /* ================================================= */
  /* ================= TOTAL FORMATIONS ============== */
  /* ================================================= */

  const totalFormations = formationStats?.length || 0;

  return (
    <div
      className="
        relative overflow-hidden
        bg-white
        rounded-[32px]
        border border-slate-200
        shadow-sm
        p-6 md:p-8
      ">
      {/* BACKGROUND EFFECTS */}
      <div
        className="
          absolute -top-16 -right-16
          w-72 h-72
          bg-indigo-100/70
          rounded-full
          blur-3xl
        "
      />

      <div
        className="
          absolute -bottom-16 -left-10
          w-60 h-60
          bg-blue-100/50
          rounded-full
          blur-3xl
        "
      />

      {/* CONTENT */}
      <div className="relative z-10 flex items-start gap-5">
        {/* ICON */}
        <div
          className="
            w-16 h-16 md:w-20 md:h-20
            rounded-3xl
            bg-gradient-to-br from-indigo-600 to-blue-600
            text-white
            flex items-center justify-center
            shadow-xl shadow-indigo-200
            shrink-0
          ">
          <Users size={34} />
        </div>

        {/* TEXT */}
        <div>
          {/* BADGE */}
          <div
            className="
              inline-flex items-center gap-2
              px-4 py-2
              rounded-full
              bg-indigo-50
              border border-indigo-100
              text-indigo-700
              text-sm font-semibold
              mb-4
            ">
            <Sparkles size={16} />
            Administration académique
          </div>

          {/* TITLE */}
          <h1
            className="
              text-3xl md:text-4xl
              font-black
              text-slate-800
              leading-tight
            ">
            Gestion des inscriptions
          </h1>

          {/* DESCRIPTION */}
          <p
            className="
              text-slate-500
              mt-3
              text-base md:text-lg
              max-w-2xl
              leading-relaxed
            ">
            Gérez efficacement les inscriptions des étudiants, suivez les
            demandes et administrez les validations depuis votre espace de
            contrôle.
          </p>

          {/* STATS */}
          <div className="flex flex-wrap items-center gap-4 mt-6">
            {/* TOTAL STUDENTS */}
            <div
              className="
                flex items-center gap-3
                px-4 py-3
                rounded-2xl
                bg-slate-50
                border border-slate-200
              ">
              <div
                className="
                  w-11 h-11 rounded-xl
                  bg-indigo-100
                  flex items-center justify-center
                ">
                <Users size={20} className="text-indigo-600" />
              </div>

              <div>
                <p className="text-sm text-slate-500">Total étudiants</p>

                <h3 className="font-bold text-slate-800">
                  {stats?.totalInscriptions?.toLocaleString() || 0}
                </h3>
              </div>
            </div>

            {/* FORMATIONS */}
            <div
              className="
                flex items-center gap-3
                px-4 py-3
                rounded-2xl
                bg-slate-50
                border border-slate-200
              ">
              <div
                className="
                  w-11 h-11 rounded-xl
                  bg-emerald-100
                  flex items-center justify-center
                ">
                <GraduationCap size={20} className="text-emerald-600" />
              </div>

              <div>
                <p className="text-sm text-slate-500">Formations actives</p>

                <h3 className="font-bold text-slate-800">{totalFormations}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
