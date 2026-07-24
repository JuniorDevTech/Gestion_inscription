import { CheckCircle2, XCircle } from "lucide-react";

export default function FormationStatusBadge({ status }) {
  const statusConfig = {
    active: {
      label: "Active",
      icon: CheckCircle2,
      className: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    },

    inactive: {
      label: "Inactive",
      icon: XCircle,
      className: "bg-red-50 text-red-700 border border-red-100",
    },
  };

  const currentStatus = statusConfig[status] || statusConfig.inactive;

  const Icon = currentStatus.icon;

  return (
    <span
      className={`
        inline-flex items-center gap-2
        px-4 py-2
        rounded-full
        text-sm font-semibold
        transition-all duration-300
        shadow-sm
        ${currentStatus.className}
      `}>
      <Icon size={16} />

      {currentStatus.label}
    </span>
  );
}
