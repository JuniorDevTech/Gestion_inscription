import {
  GraduationCap,
  Layers3,
  Clock3,
  MonitorSmartphone,
} from "lucide-react";

import { useSelector } from "react-redux";

import InputField from "./InputField";

export default function FormationSection({ formData, handleChange }) {
  /* ================================================= */
  /* ================= REDUX ========================= */
  /* ================================================= */

  const { formations } = useSelector((state) => state.formations);

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
      {/* BACKGROUND */}
      <div
        className="
          absolute -top-20 -right-20
          w-72 h-72
          bg-indigo-100/60
          rounded-full
          blur-3xl
        "
      />

      {/* CONTENT */}
      <div className="relative z-10">
        {/* HEADER */}
        <div className="flex items-start gap-4 mb-10">
          {/* ICON */}
          <div
            className="
              w-16 h-16
              rounded-3xl
              bg-gradient-to-br
              from-indigo-500
              to-blue-600
              text-white
              flex items-center justify-center
              shadow-lg
              shadow-indigo-200
              shrink-0
            ">
            <GraduationCap size={30} />
          </div>

          {/* TEXT */}
          <div>
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
              Formation académique
            </div>

            <h2
              className="
                text-3xl
                font-black
                text-slate-800
              ">
              Choix de la formation
            </h2>

            <p
              className="
                text-slate-500
                mt-3
                max-w-2xl
                leading-relaxed
              ">
              Sélectionnez la formation qui correspond à votre objectif
              professionnel et à votre niveau actuel.
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FORMATION */}
          <InputField
            icon={GraduationCap}
            label="Formation"
            name="formation"
            value={formData?.formation || ""}
            onChange={handleChange}
            type="select"
            options={formations.map((formation) => ({
              value: formation._id,

              label: formation.title,
            }))}
          />

          {/* LEVEL */}
          <InputField
            icon={Layers3}
            label="Niveau"
            name="level"
            value={formData?.level || ""}
            onChange={handleChange}
            type="select"
            options={[
              {
                value: "Débutant",
                label: "Débutant",
              },

              {
                value: "Intermédiaire",
                label: "Intermédiaire",
              },

              {
                value: "Avancé",
                label: "Avancé",
              },
            ]}
          />

          {/* MODE */}
          <InputField
            icon={MonitorSmartphone}
            label="Mode de formation"
            name="mode"
            value={formData?.mode || ""}
            onChange={handleChange}
            type="select"
            options={[
              {
                value: "Présentiel",
                label: "Présentiel",
              },

              {
                value: "En ligne",
                label: "En ligne",
              },

              {
                value: "Hybride",
                label: "Hybride",
              },
            ]}
          />

          {/* DURATION */}
          <InputField
            icon={Clock3}
            label="Durée"
            name="duration"
            value={formData?.duration || ""}
            onChange={handleChange}
            type="select"
            options={[
              {
                value: "3 mois",
                label: "3 mois",
              },

              {
                value: "6 mois",
                label: "6 mois",
              },

              {
                value: "12 mois",
                label: "12 mois",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
