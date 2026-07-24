import {
  Star,
  Pencil,
  Trash2,
  Clock3,
  GraduationCap,
  Sparkles,
  ImageOff,
} from "lucide-react";

import FormationStatusBadge from "./FormationStatusBadge";

export default function FormationCard({ formation, onEdit, onDelete }) {
  /* ================================================= */
  /* ================= IMAGE ========================= */
  /* ================================================= */

  const imageUrl = formation.image
    ? `http://localhost:5000${formation.image}`
    : null;

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[32px]
        border border-slate-200/80
        bg-white/95
        backdrop-blur-xl
        shadow-sm
        hover:shadow-[0_25px_60px_-15px_rgba(15,23,42,0.15)]
        transition-all duration-500
        hover:-translate-y-2
      ">
      {/* BACKGROUND LIGHT */}
      <div
        className="
          absolute
          -top-24
          -right-24
          w-60
          h-60
          rounded-full
          bg-indigo-100/60
          blur-3xl
          opacity-0
          group-hover:opacity-100
          transition-all duration-700
        "
      />

      {/* IMAGE */}
      <div className="relative h-64 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={formation.title}
            className="
              w-full
              h-full
              object-cover
              transition-transform duration-700
              group-hover:scale-110
            "
          />
        ) : (
          <div
            className="
              w-full h-full
              bg-slate-100
              flex items-center justify-center
            ">
            <div className="text-center">
              <div
                className="
                  mx-auto
                  w-20 h-20
                  rounded-3xl
                  bg-slate-200
                  flex items-center justify-center
                ">
                <ImageOff size={36} className="text-slate-400" />
              </div>

              <p className="mt-4 text-slate-500 font-medium">Aucune image</p>
            </div>
          </div>
        )}

        {/* OVERLAY */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-black/70
            via-black/20
            to-transparent
          "
        />

        {/* TOP BADGES */}
        <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
          {/* CATEGORY */}
          <div
            className="
              px-4 py-2
              rounded-2xl
              bg-white/90
              backdrop-blur-xl
              text-sm
              font-bold
              text-slate-800
              shadow-lg
            ">
            {formation.category || "Non classé"}
          </div>

          {/* STATUS */}
          <FormationStatusBadge status={formation.status} />
        </div>

        {/* TITLE */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center gap-2">
            <div
              className="
                flex items-center gap-1
                px-3 py-1.5
                rounded-xl
                bg-amber-400
                text-white
                text-sm
                font-bold
                shadow-lg
              ">
              <Star size={14} className="fill-white" />

              {formation.rating || "0.0"}
            </div>
          </div>

          <h2
            className="
              mt-4
              text-3xl
              font-black
              text-white
              leading-tight
              line-clamp-2
            ">
            {formation.title}
          </h2>
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 p-7">
        {/* DESCRIPTION */}
        <p
          className="
            text-slate-500
            leading-relaxed
            text-[15px]
            line-clamp-3
          ">
          {formation.description}
        </p>

        {/* INFOS */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          {/* LEVEL */}
          <div
            className="
              flex items-center gap-3
              p-4
              rounded-2xl
              bg-slate-50
              border border-slate-100
            ">
            <div
              className="
                w-11 h-11
                rounded-2xl
                bg-indigo-100
                text-indigo-600
                flex items-center justify-center
              ">
              <GraduationCap size={20} />
            </div>

            <div>
              <p className="text-xs text-slate-400">Niveau</p>

              <h4 className="font-bold text-slate-800">
                {formation.level || "Non défini"}
              </h4>
            </div>
          </div>

          {/* DURATION */}
          <div
            className="
              flex items-center gap-3
              p-4
              rounded-2xl
              bg-slate-50
              border border-slate-100
            ">
            <div
              className="
                w-11 h-11
                rounded-2xl
                bg-blue-100
                text-blue-600
                flex items-center justify-center
              ">
              <Clock3 size={20} />
            </div>

            <div>
              <p className="text-xs text-slate-400">Durée</p>

              <h4 className="font-bold text-slate-800">
                {formation.duration || "Non définie"}
              </h4>
            </div>
          </div>
        </div>

        {/* PRICE */}
        <div
          className="
            mt-6
            relative overflow-hidden
            rounded-3xl
            bg-gradient-to-r
            from-slate-900
            via-slate-800
            to-indigo-900
            p-5
            text-white
          ">
          {/* BG EFFECT */}
          <div
            className="
              absolute
              -right-8
              -top-8
              w-28
              h-28
              rounded-full
              bg-white/10
            "
          />

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Prix de la formation</p>

              <h3
                className="
                  mt-1
                  text-3xl
                  font-black
                  tracking-tight
                ">
                {Number(formation.price || 0).toLocaleString()} FCFA
              </h3>
            </div>

            <div
              className="
                w-14 h-14
                rounded-2xl
                bg-white/10
                backdrop-blur-xl
                flex items-center justify-center
              ">
              <Sparkles size={24} />
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-7 grid grid-cols-2 gap-4">
          {/* EDIT */}
          <button
            type="button"
            onClick={() => onEdit?.(formation)}
            className="
              group/edit
              flex items-center justify-center gap-2
              rounded-2xl
              border border-blue-100
              bg-blue-50
              py-4
              font-bold
              text-blue-600
              transition-all duration-300
              hover:bg-blue-600
              hover:text-white
              hover:shadow-lg
              hover:shadow-blue-200
            ">
            <Pencil
              size={18}
              className="
                transition-transform duration-300
                group-hover/edit:rotate-12
              "
            />
            Modifier
          </button>

          {/* DELETE */}
          <button
            type="button"
            onClick={() => onDelete?.(formation._id)}
            className="
              group/delete
              flex items-center justify-center gap-2
              rounded-2xl
              border border-red-100
              bg-red-50
              py-4
              font-bold
              text-red-600
              transition-all duration-300
              hover:bg-red-600
              hover:text-white
              hover:shadow-lg
              hover:shadow-red-200
            ">
            <Trash2
              size={18}
              className="
                transition-transform duration-300
                group-hover/delete:scale-110
              "
            />
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
