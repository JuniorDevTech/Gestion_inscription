import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { TrendingUp } from "lucide-react";

import { getFormationStats } from "../../features/dashboardAdmin/dashboardService";

export default function FormationChart() {
  const dispatch = useDispatch();

  const { formationStats, formationLoading } = useSelector(
    (state) => state.dashboard,
  );

  /* ================================================= */
  /* ================= FETCH ========================= */
  /* ================================================= */

  useEffect(() => {
    dispatch(getFormationStats());
  }, [dispatch]);

  if (formationLoading) {
    return (
      <div className="bg-white rounded-[28px] p-6 h-[420px] flex items-center justify-center">
        Chargement...
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
          absolute -top-10 -right-10
          w-40 h-40
          bg-indigo-100
          rounded-full
          blur-3xl
          opacity-70
        "
      />

      {/* HEADER */}
      <div className="relative z-10 flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Popularité des formations
          </h2>

          <p className="text-slate-500 text-sm mt-1">
            Analyse des formations les plus populaires
          </p>
        </div>

        <div
          className="
            flex items-center gap-2
            px-4 py-2
            rounded-2xl
            bg-emerald-50
            border border-emerald-100
          ">
          <TrendingUp size={18} className="text-emerald-600" />

          <span className="text-sm font-semibold text-emerald-700">
            Temps réel
          </span>
        </div>
      </div>

      {/* CHART */}
      <div className="relative z-10 h-[300px]">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={formationStats}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />

            <XAxis
              dataKey="name"
              tick={{
                fill: "#64748b",
                fontSize: 13,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fill: "#64748b",
                fontSize: 13,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{
                fill: "rgba(99, 102, 241, 0.08)",
              }}
              contentStyle={{
                borderRadius: "16px",

                border: "1px solid #e2e8f0",

                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",

                padding: "12px",
              }}
            />

            <Bar
              dataKey="value"
              fill="#4f46e5"
              radius={[12, 12, 0, 0]}
              barSize={45}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
