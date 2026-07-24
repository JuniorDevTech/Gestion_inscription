import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Users, BadgeCheck, Clock3, CreditCard } from "lucide-react";

import { getDashboardStats } from "../../features/dashboardAdmin/dashboardService";

export default function GlobalStats() {
  const dispatch = useDispatch();

  const { stats, loading } = useSelector((state) => state.dashboard);

  /* ================================================= */
  /* ================= FETCH ========================= */
  /* ================================================= */

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  /* ================================================= */
  /* ================= LOADING ======================= */
  /* ================================================= */

  if (loading) {
    return <div className="text-center py-10">Chargement...</div>;
  }

  /* ================================================= */
  /* ================= DYNAMIC STATS ================= */
  /* ================================================= */

  const data = [
    {
      title: "Inscriptions",
      value: stats?.totalInscriptions || 0,
      icon: Users,
      color: "bg-blue-500",
    },

    {
      title: "Approuvées",
      value: stats?.validated || 0,
      icon: BadgeCheck,
      color: "bg-emerald-500",
    },

    {
      title: "En attente",
      value: stats?.pending || 0,
      icon: Clock3,
      color: "bg-amber-500",
    },

    {
      title: "Paiements",
      value: stats?.payments || 0,
      icon: CreditCard,
      color: "bg-violet-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {data.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="
              bg-white
              rounded-[20px]
              border border-slate-200
              p-5
              shadow-sm
            ">
            <div className="flex items-center justify-between">
              {/* LEFT */}
              <div>
                <p className="text-sm text-slate-500">{item.title}</p>

                <h2
                  className="
                    text-3xl
                    font-bold
                    text-slate-800
                    mt-3
                  ">
                  {item.value}
                </h2>
              </div>

              {/* ICON */}
              <div
                className={`
                  w-14 h-14
                  rounded-2xl
                  flex items-center justify-center
                  text-white
                  ${item.color}
                `}>
                <Icon size={26} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
