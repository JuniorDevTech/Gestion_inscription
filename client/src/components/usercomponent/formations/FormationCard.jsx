import {
  Clock3,
  Users,
  GraduationCap,
  Star,
  ArrowRight,
  Sparkles,
  BookOpen,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import FormationInfoItem from "./FormationInfoItem";

export default function FormationCard({ formation }) {
  const navigate = useNavigate();

  /* ================================================= */
  /* ================= IMAGE ========================= */
  /* ================================================= */

  const imageUrl = formation.image?.startsWith("http")
    ? formation.image
    : `http://localhost:5000${formation.image}`;

  /* ================================================= */
  /* ================= INSCRIPTION =================== */
  /* ================================================= */

  const handleInscription = () => {
    navigate("/dashboard/inscription", {
      state: {
        formation,
      },
    });
  };

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        bg-white/95
        backdrop-blur-xl
        rounded-[32px]
        border border-slate-200/80
        shadow-sm
        hover:shadow-[0_25px_60px_-15px_rgba(15,23,42,0.15)]
        transition-all duration-500
        hover:-translate-y-2
      ">
      {/* BACKGROUND EFFECT */}
      <div
        className="
          absolute
          -top-20
          -right-20
          w-60
          h-60
          bg-indigo-100/70
          rounded-full
          blur-3xl
          opacity-0
          group-hover:opacity-100
          transition-all duration-700
        "
      />

      {/* IMAGE */}
      <div className="relative h-64 overflow-hidden">
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

        {/* OVERLAY */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-black/80
            via-black/20
            to-transparent
          "
        />

        {/* CATEGORY */}
        <div
          className="
            absolute top-5 left-5
            px-4 py-2
            rounded-2xl
            bg-white/90
            backdrop-blur-xl
            text-sm font-bold
            text-slate-800
            shadow-lg
          ">
          {formation.category}
        </div>

        {/* RATING */}
        <div
          className="
            absolute top-5 right-5
            flex items-center gap-2
            px-4 py-2
            rounded-2xl
            bg-amber-400
            text-white
            font-bold
            shadow-lg
          ">
          <Star size={16} className="fill-white" />

          <span>{formation.rating || "4.9"}</span>
        </div>

        {/* TITLE */}
        <div className="absolute bottom-6 left-6 right-6">
          <h2
            className="
              text-3xl
              font-black
              text-white
              leading-tight
              line-clamp-2
            ">
            {formation.title}
          </h2>

          <div className="flex items-center gap-2 mt-3">
            <Sparkles size={16} className="text-indigo-300" />

            <span className="text-sm text-slate-200">
              Formation professionnelle
            </span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 p-7">
        {/* DESCRIPTION */}
        <p
          className="
            text-slate-500
            leading-relaxed
            line-clamp-3
          ">
          {formation.description}
        </p>

        {/* INFOS */}
        <div className="mt-7 space-y-4">
          <FormationInfoItem icon={Clock3} text={formation.duration} />

          <FormationInfoItem
            icon={Users}
            text={`${formation.students || 0} étudiant(s)`}
          />

          <FormationInfoItem icon={GraduationCap} text={formation.level} />
        </div>

        {/* PRICE CARD */}
        <div
          className="
            mt-7
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
              -top-6
              -right-6
              w-24
              h-24
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
              <BookOpen size={26} />
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleInscription}
          className="
            group/button
            mt-7
            w-full
            h-16
            rounded-2xl
            bg-gradient-to-r
            from-indigo-600
            to-blue-600
            text-white
            font-bold
            flex items-center
            justify-center
            gap-3
            shadow-lg
            shadow-indigo-200
            hover:shadow-xl
            hover:shadow-indigo-300
            transition-all duration-300
            hover:scale-[1.02]
          ">
          <span>S'inscrire maintenant</span>

          <ArrowRight
            size={20}
            className="
              transition-transform duration-300
              group-hover/button:translate-x-1
            "
          />
        </button>
      </div>
    </div>
  );
}
