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
  Cell,
} from "recharts";

import { TrendingUp, BookOpen } from "lucide-react";

import { getFormationStats } from "../../features/dashboardAdmin/dashboardService";

const COLORS = ["#4F46E5", "#0EA5E9", "#10B981", "#F59E0B"];

export default function FormationStatsChart() {
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

  /* ================================================= */
  /* ================= LOADING ======================= */
  /* ================================================= */

  if (formationLoading) {
    return (
      <div className="bg-white rounded-[30px] p-6 h-[430px] flex items-center justify-center">
        Chargement...
      </div>
    );
  }

  /* ================================================= */
  /* ================= TOP FORMATION ================= */
  /* ================================================= */

  const topFormation =
    formationStats && formationStats.length > 0
      ? formationStats.reduce((prev, current) =>
          prev.value > current.value ? prev : current,
        )
      : null;

  return (
    <div
      className="
        relative overflow-hidden
        bg-white
        rounded-[30px]
        border border-slate-200
        shadow-sm
        p-6
        h-[430px]
      ">
      {/* HEADER */}
      <div
        className="
          relative z-10
          flex flex-col md:flex-row
          md:items-center
          md:justify-between
          gap-4
          mb-8
        ">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Popularité des formations
          </h2>

          <p className="text-slate-500 mt-1">
            Analyse des formations les plus suivies
          </p>
        </div>

        {/* TOP FORMATION */}
        {topFormation && (
          <div
            className="
              flex items-center gap-3
              px-4 py-3
              rounded-2xl
              bg-indigo-50
              border border-indigo-100
              w-fit
            ">
            <div
              className="
                w-11 h-11 rounded-xl
                bg-indigo-600
                flex items-center justify-center
                text-white
              ">
              <BookOpen size={20} />
            </div>

            <div>
              <p className="text-sm text-slate-500">Formation populaire</p>

              <div className="flex items-center gap-1">
                <TrendingUp size={16} className="text-emerald-600" />

                <span className="font-bold text-slate-800">
                  {topFormation.name}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CHART */}
      <div className="relative z-10 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={formationStats || []}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}>
            {/* GRID */}
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#E2E8F0"
            />

            {/* X AXIS */}
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748B",
                fontSize: 13,
                fontWeight: 500,
              }}
            />

            {/* Y AXIS */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748B",
                fontSize: 13,
                fontWeight: 500,
              }}
            />

            {/* TOOLTIP */}
            <Tooltip
              cursor={{
                fill: "rgba(99,102,241,0.08)",
              }}
              contentStyle={{
                borderRadius: "18px",
                border: "1px solid #E2E8F0",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                padding: "12px 14px",
              }}
            />

            {/* BARS */}
            <Bar dataKey="value" radius={[14, 14, 0, 0]} barSize={50}>
              {(formationStats || []).map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
