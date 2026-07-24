import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatsCard({
  title,
  value,
  icon: Icon,
  color,
  growth = 0,
  subtitle = "ce mois-ci",
}) {
  const isPositive = growth >= 0;

  return (
    <div
      className="
        relative overflow-hidden
        bg-white
        rounded-[28px]
        border border-slate-200
        shadow-sm
        p-5 md:p-6
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-xl
      ">
      {/* BACKGROUND EFFECT */}
      <div
        className="
          absolute -top-10 -right-10
          w-36 h-36
          bg-slate-100
          rounded-full
          blur-3xl
          opacity-70
        "
      />

      {/* CONTENT */}
      <div className="relative z-10 flex items-start justify-between gap-4">
        {/* LEFT */}
        <div className="flex-1">
          {/* TITLE */}
          <p
            className="
              text-sm font-medium
              text-slate-500
              tracking-wide
            ">
            {title}
          </p>

          {/* VALUE */}
          <h2
            className="
              text-3xl md:text-4xl
              font-black
              text-slate-800
              mt-3
              leading-none
            ">
            {value?.toLocaleString()}
          </h2>

          {/* GROWTH */}
          <div className="flex items-center gap-2 mt-5">
            <div
              className={`
                flex items-center gap-1
                px-3 py-1.5
                rounded-full
                text-xs font-semibold
                border

                ${
                  isPositive
                    ? `
                      bg-emerald-50
                      border-emerald-100
                      text-emerald-700
                    `
                    : `
                      bg-red-50
                      border-red-100
                      text-red-700
                    `
                }
              `}>
              {isPositive ? (
                <TrendingUp size={14} />
              ) : (
                <TrendingDown size={14} />
              )}

              <span>
                {isPositive ? "+" : ""}
                {growth}%
              </span>
            </div>

            <span className="text-xs text-slate-400">{subtitle}</span>
          </div>
        </div>

        {/* ICON */}
        <div
          className={`
            relative shrink-0
            w-16 h-16 md:w-18 md:h-18
            rounded-2xl
            flex items-center justify-center
            text-white
            shadow-lg
            ${color}
          `}>
          {/* GLOW */}
          <div
            className="
              absolute inset-0
              rounded-2xl
              bg-white/10
            "
          />

          <Icon size={30} className="relative z-10" />
        </div>
      </div>
    </div>
  );
}
