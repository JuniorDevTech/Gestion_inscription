import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { TrendingUp, Wallet } from "lucide-react";

import { getPaymentStats } from "../../features/dashboardAdmin/dashboardService";

export default function PaymentStatusChart() {
  const dispatch = useDispatch();

  const { paymentStats, paymentLoading } = useSelector(
    (state) => state.dashboard,
  );

  /* ================================================= */
  /* ================= FETCH ========================= */
  /* ================================================= */

  useEffect(() => {
    dispatch(getPaymentStats());
  }, [dispatch]);

  /* ================================================= */
  /* ================= LOADING ======================= */
  /* ================================================= */

  if (paymentLoading) {
    return (
      <div
        className="
          bg-white
          rounded-[28px]
          p-6
          h-[420px]
          flex items-center justify-center
        ">
        Chargement...
      </div>
    );
  }

  /* ================================================= */
  /* ================= EMPTY ========================= */
  /* ================================================= */

  if (!paymentStats || paymentStats.length === 0) {
    return (
      <div className="bg-white rounded-[28px] p-6">
        Aucun paiement disponible
      </div>
    );
  }

  console.log(paymentStats);

  return (
    <div
      className="
        relative overflow-hidden
        bg-white
        rounded-[28px]
        border border-slate-200
        shadow-sm
        p-5 md:p-6
        w-full
      ">
      {/* BACKGROUND */}
      <div
        className="
          absolute top-0 right-0
          w-56 h-56
          bg-emerald-100/50
          rounded-full
          blur-3xl
        "
      />

      {/* HEADER */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Évolution des paiements
          </h2>

          <p className="text-slate-500 mt-1 text-sm">
            Suivi mensuel des paiements de la plateforme
          </p>
        </div>

        {/* CARD */}
        <div
          className="
            flex items-center gap-3
            bg-emerald-50
            border border-emerald-100
            rounded-2xl
            px-4 py-3
            w-fit
          ">
          <div
            className="
              w-12 h-12 rounded-xl
              bg-emerald-500
              flex items-center justify-center
            ">
            <Wallet className="text-white" size={22} />
          </div>

          <div>
            <p className="text-sm text-slate-500">Croissance</p>

            <div className="flex items-center gap-1">
              <TrendingUp size={18} className="text-emerald-600" />

              <span className="font-bold text-emerald-700 text-lg">
                +{paymentStats.growth || 0}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CHART */}
      <div className="relative z-10 h-[320px] w-full">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart
            data={paymentStats.data || []}
            margin={{
              top: 10,
              right: 20,
              left: 0,
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
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748B",
                fontSize: 13,
              }}
            />

            {/* Y AXIS */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748B",
                fontSize: 13,
              }}
            />

            {/* TOOLTIP */}
            <Tooltip
              contentStyle={{
                borderRadius: "16px",

                border: "1px solid #E2E8F0",

                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              }}
            />

            {/* LINE */}
            <Line
              type="monotone"
              dataKey="payments"
              stroke="#10B981"
              strokeWidth={4}
              dot={{
                r: 5,
                fill: "#10B981",
                stroke: "#ffffff",
                strokeWidth: 3,
              }}
              activeDot={{
                r: 8,
                fill: "#10B981",
                stroke: "#ffffff",
                strokeWidth: 3,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
