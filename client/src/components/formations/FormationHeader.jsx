import { Plus, GraduationCap, Sparkles } from "lucide-react";

export default function FormationHeader({ onAdd }) {
  return (
    <div
      className="
        relative overflow-hidden
        bg-white
        rounded-[32px]
        border border-slate-200
        shadow-sm
        p-6 md:p-8
      ">
      {/* BACKGROUND EFFECT */}
      <div
        className="
          absolute -top-16 -right-16
          w-72 h-72
          bg-indigo-100/70
          rounded-full
          blur-3xl
        "
      />

      <div
        className="
          absolute -bottom-16 -left-10
          w-60 h-60
          bg-blue-100/50
          rounded-full
          blur-3xl
        "
      />

      {/* CONTENT */}
      <div
        className="
          relative z-10
          flex flex-col xl:flex-row
          xl:items-center
          xl:justify-between
          gap-6
        ">
        {/* LEFT */}
        <div className="flex items-start gap-5">
          {/* ICON */}
          <div
            className="
              w-16 h-16 md:w-20 md:h-20
              rounded-3xl
              bg-gradient-to-br from-indigo-600 to-blue-600
              text-white
              flex items-center justify-center
              shadow-xl shadow-indigo-200
              shrink-0
            ">
            <GraduationCap size={34} />
          </div>

          {/* TEXT */}
          <div>
            {/* BADGE */}
            <div
              className="
                inline-flex items-center gap-2
                px-4 py-2
                rounded-full
                bg-indigo-50
                border border-indigo-100
                text-indigo-700
                text-sm font-semibold
                mb-4
              ">
              <Sparkles size={16} />
              Centre de gestion académique
            </div>

            {/* TITLE */}
            <h1
              className="
                text-3xl md:text-4xl
                font-black
                text-slate-800
                leading-tight
              ">
              Gestion des formations
            </h1>

            {/* DESCRIPTION */}
            <p
              className="
                text-slate-500
                mt-3
                text-base md:text-lg
                max-w-2xl
                leading-relaxed
              ">
              Gérez, organisez et administrez toutes les formations disponibles
              sur votre plateforme éducative.
            </p>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={onAdd}
          className="
            group
            relative overflow-hidden
            flex items-center justify-center gap-3
            bg-gradient-to-r from-indigo-600 to-blue-600
            hover:from-indigo-700 hover:to-blue-700
            text-white
            px-6 py-4
            rounded-2xl
            font-semibold
            shadow-xl shadow-indigo-200
            transition-all duration-300
            hover:scale-[1.02]
            hover:-translate-y-0.5
            w-full sm:w-auto
          ">
          {/* GLOW */}
          <div
            className="
              absolute inset-0
              bg-white/10
              opacity-0
              group-hover:opacity-100
              transition
            "
          />

          <Plus
            size={22}
            className="
              relative z-10
              transition-transform duration-300
              group-hover:rotate-90
            "
          />

          <span className="relative z-10">Ajouter une formation</span>
        </button>
      </div>
    </div>
  );
}
