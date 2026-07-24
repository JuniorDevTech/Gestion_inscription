export default function StatusCard({ title, value, icon: Icon, color }) {
  /* ================================================= */
  /* ================= STATUS COLORS ================= */
  /* ================================================= */

  const isSuccess =
    value?.toLowerCase()?.includes("valid") ||
    value?.toLowerCase()?.includes("confirm");

  const isRejected =
    value?.toLowerCase()?.includes("rejet") ||
    value?.toLowerCase()?.includes("échoué");

  return (
    <div
      className="
        relative overflow-hidden
        bg-white
        rounded-[32px]
        border border-slate-200
        shadow-sm
        p-6
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-2xl
      ">
      {/* ================================================= */}
      {/* ================= BACKGROUND GLOW ============== */}
      {/* ================================================= */}

      <div
        className={`
          absolute -top-16 -right-16
          w-52 h-52
          rounded-full
          blur-3xl
          opacity-30

          ${
            isSuccess
              ? "bg-emerald-300"
              : isRejected
                ? "bg-red-300"
                : "bg-amber-300"
          }
        `}
      />

      {/* ================================================= */}
      {/* ================= CONTENT ====================== */}
      {/* ================================================= */}

      <div className="relative z-10">
        {/* TOP */}
        <div
          className="
            flex items-start justify-between
            gap-4
          ">
          {/* TEXT */}
          <div>
            <p
              className="
                text-sm
                font-semibold
                text-slate-500
                tracking-wide
                uppercase
              ">
              {title}
            </p>

            <h3
              className="
                mt-4
                text-3xl
                font-black
                text-slate-800
                leading-tight
              ">
              {value}
            </h3>

            {/* STATUS BADGE */}
            <div
              className={`
                mt-4
                inline-flex items-center gap-2
                px-4 py-2
                rounded-2xl
                text-sm font-bold

                ${
                  isSuccess
                    ? `
                      bg-emerald-100
                      text-emerald-700
                    `
                    : isRejected
                      ? `
                        bg-red-100
                        text-red-700
                      `
                      : `
                        bg-amber-100
                        text-amber-700
                      `
                }
              `}>
              <span
                className={`
                  w-2.5 h-2.5
                  rounded-full

                  ${
                    isSuccess
                      ? "bg-emerald-500"
                      : isRejected
                        ? "bg-red-500"
                        : "bg-amber-500"
                  }
                `}
              />

              {isSuccess
                ? "Statut confirmé"
                : isRejected
                  ? "Action requise"
                  : "En cours"}
            </div>
          </div>

          {/* ICON */}
          <div
            className={`
              shrink-0
              w-16 h-16
              rounded-3xl
              text-white
              flex items-center justify-center
              shadow-xl
              ${color}
            `}>
            <Icon size={30} />
          </div>
        </div>

        {/* BOTTOM */}
        <div
          className="
            mt-8
            pt-5
            border-t border-slate-100
          ">
          <p
            className="
              text-sm
              text-slate-400
              leading-relaxed
            ">
            Mise à jour automatique selon les validations de l’administration.
          </p>
        </div>
      </div>
    </div>
  );
}
