import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { CheckCircle2 } from "lucide-react";

import { getDashboardStats } from "../../features/dashboardAdmin/dashboardService";

const COLORS = ["#10B981", "#F59E0B", "#EF4444"];

export default function InscriptionPieChart() {
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
    return (
      <div className="bg-white rounded-[30px] p-6 h-[430px] flex items-center justify-center">
        Chargement...
      </div>
    );
  }

  /* ================================================= */
  /* ================= DYNAMIC DATA ================== */
  /* ================================================= */

  const data = [
    {
      name: "Validées",
      value: stats?.validated || 0,
    },

    {
      name: "En attente",
      value: stats?.pending || 0,
    },

    {
      name: "Rejetées",
      value: stats?.rejected || 0,
    },
  ];

  /* ================================================= */
  /* ================= VALIDATION RATE =============== */
  /* ================================================= */

  const total =
    (stats?.validated || 0) + (stats?.pending || 0) + (stats?.rejected || 0);

  const validationRate =
    total > 0 ? Math.round(((stats?.validated || 0) / total) * 100) : 0;

  return (
    <div
      className="
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
          flex flex-col md:flex-row
          md:items-center
          md:justify-between
          gap-4
          mb-8
        ">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Répartition des inscriptions
          </h2>

          <p className="text-slate-500 mt-1">
            Analyse globale des statuts d’inscription
          </p>
        </div>

        {/* VALIDATION RATE */}
        <div
          className="
            flex items-center gap-3
            px-4 py-3
            rounded-2xl
            bg-emerald-50
            border border-emerald-100
            w-fit
          ">
          <div
            className="
              w-11 h-11 rounded-xl
              bg-emerald-500
              flex items-center justify-center
              text-white
            ">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <p className="text-sm text-slate-500">Taux de validation</p>

            <span className="font-bold text-slate-800">{validationRate}%</span>
          </div>
        </div>
      </div>

      {/* CHART */}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={105}
              paddingAngle={5}
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

            {/* TOOLTIP */}
            <Tooltip />

            {/* LEGEND */}
            <Legend verticalAlign="bottom" iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
