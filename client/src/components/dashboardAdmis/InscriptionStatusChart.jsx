import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { CheckCircle2 } from "lucide-react";

import { getInscriptionStats } from "../../features/inscription/inscriptionService";

const COLORS = ["#4f46e5", "#f59e0b", "#ef4444"];

export default function InscriptionStatusChart() {
  const dispatch = useDispatch();

  const { stats, loading } = useSelector((state) => state.inscriptions);

  /* ================================================= */
  /* ================= FETCH STATS =================== */
  /* ================================================= */

  useEffect(() => {
    dispatch(getInscriptionStats());
  }, [dispatch]);

  /* ================================================= */
  /* ================= LOADING ======================= */
  /* ================================================= */

  if (loading || !stats) {
    return (
      <div className="bg-white rounded-[28px] p-6 h-[420px] flex items-center justify-center">
        Chargement...
      </div>
    );
  }

  /* ================================================= */
  /* ================= DATA ========================== */
  /* ================================================= */

  const data = [
    {
      name: "Validées",

      value: stats.validated,
    },

    {
      name: "En attente",

      value: stats.pending,
    },

    {
      name: "Rejetées",

      value: stats.rejected,
    },
  ];

  const validatedPercent = ((stats.validated / stats.total) * 100).toFixed(0);

  if (!stats) {
    return (
      <div
        className="
        bg-white
        rounded-[28px]
        p-6
        h-[420px]
        flex items-center justify-center
      ">
        Chargement des statistiques...
      </div>
    );
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
        h-[420px]
      ">
      {/* BACKGROUND */}
      <div
        className="
          absolute -bottom-16 -right-10
          w-44 h-44
          bg-indigo-100
          rounded-full
          blur-3xl
          opacity-70
        "
      />

      {/* HEADER */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Statut des inscriptions
          </h2>

          <p className="text-slate-500 text-sm mt-1">
            Répartition globale des demandes
          </p>
        </div>

        <div
          className="
            flex items-center gap-2
            px-4 py-2 rounded-2xl
            bg-indigo-50
            border border-indigo-100
          ">
          <CheckCircle2 size={18} className="text-indigo-600" />

          <span className="text-sm font-semibold text-indigo-700">
            {validatedPercent}% validées
          </span>
        </div>
      </div>

      {/* CHART */}
      <div className="relative z-10 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={105}
              paddingAngle={4}
              dataKey="value"
              stroke="transparent"
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend verticalAlign="bottom" iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
