import { Clock3, BadgeCheck, XCircle } from "lucide-react";

export default function StatusBadge({ status }) {
  /* ================================================= */
  /* ================= STATUS CONFIG ================= */
  /* ================================================= */

  const statusConfig = {
    "en attente": {
      label: "En attente",

      icon: Clock3,

      className: `
        bg-amber-50
        text-amber-700
        border border-amber-100
      `,
    },

    validée: {
      label: "Validée",

      icon: BadgeCheck,

      className: `
        bg-emerald-50
        text-emerald-700
        border border-emerald-100
      `,
    },

    rejetée: {
      label: "Rejetée",

      icon: XCircle,

      className: `
        bg-red-50
        text-red-700
        border border-red-100
      `,
    },
  };

  /* ================================================= */
  /* ================= CURRENT STATUS ================ */
  /* ================================================= */

  const currentStatus = statusConfig[status] || statusConfig["en attente"];

  const Icon = currentStatus.icon;

  /* ================================================= */
  /* ================= RENDER ======================== */
  /* ================================================= */

  return (
    <span
      className={`
        inline-flex items-center gap-2
        px-4 py-2
        rounded-full
        text-sm font-semibold
        transition-all duration-300
        ${currentStatus.className}
      `}>
      <Icon size={16} />

      {currentStatus.label}
    </span>
  );
}
