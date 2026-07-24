import { ArrowRight, BadgeCheck, Clock3, XCircle } from "lucide-react";

export default function NextStepCard({ inscription }) {
  /* ================================================= */
  /* ================= STATUS ======================== */
  /* ================================================= */

  const isValidated =
    inscription?.personalValidated &&
    inscription?.formationValidated &&
    inscription?.documentsValidated &&
    inscription?.paymentValidated;

  const isRejected = inscription?.status === "rejetée";

  const isPending = !isValidated && !isRejected;

  /* ================================================= */
  /* ================= STEPS ========================= */
  /* ================================================= */

  const steps = [
    {
      title: "Analyse administrative du dossier",

      done: inscription?.formationValidated === true,
    },

    {
      title: "Validation des documents",

      done: inscription?.documentsValidated === true,
    },

    {
      title: "Confirmation définitive de l’inscription",

      done: inscription?.status === "validée",
    },

    {
      title: "Réception des accès à la formation",

      done: inscription?.status === "validée",
    },
  ];
  return (
    <div
      className="
        relative overflow-hidden
        bg-white
        rounded-[32px]
        border border-slate-200
        shadow-sm
        p-6 md:p-8
        hover:shadow-xl
        transition-all duration-300
      ">
      {/* ================================================= */}
      {/* ================= BACKGROUND EFFECT ============ */}
      {/* ================================================= */}

      <div
        className={`
          absolute -top-16 -right-16
          w-56 h-56
          rounded-full
          blur-3xl
          opacity-20

          ${
            isValidated
              ? "bg-emerald-100 text-emerald-700"
              : isRejected
                ? "bg-red-100 text-red-700"
                : isPending
                  ? "bg-amber-100 text-amber-700"
                  : ""
          }
        `}
      />

      {/* ================================================= */}
      {/* ================= HEADER ======================= */}
      {/* ================================================= */}

      <div className="relative z-10">
        <div
          className="
            flex items-center justify-between
            gap-4 flex-wrap
          ">
          <div>
            <h2
              className="
                text-2xl
                font-black
                text-slate-800
              ">
              Prochaines étapes
            </h2>

            <p
              className="
                mt-2
                text-slate-500
              ">
              Suivi automatique selon l’évolution de votre dossier.
            </p>
          </div>

          {/* STATUS */}
          <div
            className={`
              px-4 py-2
              rounded-2xl
              text-sm font-bold
              flex items-center gap-2

              ${
                isValidated
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
            {isValidated ? (
              <BadgeCheck size={18} />
            ) : isRejected ? (
              <XCircle size={18} />
            ) : (
              <Clock3 size={18} />
            )}

            {isValidated
              ? "Dossier validé"
              : isRejected
                ? "Dossier rejeté"
                : "En attente"}
          </div>
        </div>

        {/* ================================================= */}
        {/* ================= STEPS ======================== */}
        {/* ================================================= */}

        <div className="mt-8 space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`
                flex items-center justify-between
                gap-4
                p-5
                rounded-3xl
                border
                transition-all duration-300

                ${
                  step.done
                    ? `
                      bg-emerald-50
                      border-emerald-100
                    `
                    : isRejected
                      ? `
                        bg-red-50
                        border-red-100
                      `
                      : `
                        bg-slate-50
                        border-slate-100
                      `
                }
              `}>
              <div className="flex items-center gap-4">
                {/* ICON */}
                <div
                  className={`
                    w-12 h-12
                    rounded-2xl
                    flex items-center justify-center
                    shadow-sm

                    ${
                      step.done
                        ? `
                          bg-emerald-500
                          text-white
                        `
                        : isRejected
                          ? `
                            bg-red-500
                            text-white
                          `
                          : `
                            bg-indigo-100
                            text-indigo-600
                          `
                    }
                  `}>
                  {step.done ? (
                    <BadgeCheck size={20} />
                  ) : isRejected ? (
                    <XCircle size={20} />
                  ) : (
                    <ArrowRight size={20} />
                  )}
                </div>

                {/* TEXT */}
                <div>
                  <p
                    className="
                      font-bold
                      text-slate-800
                    ">
                    {step.title}
                  </p>

                  <p
                    className="
                      text-sm
                      text-slate-500
                      mt-1
                    ">
                    {step.done
                      ? "Étape validée"
                      : isRejected
                        ? "Processus interrompu"
                        : "En attente de traitement"}
                  </p>
                </div>
              </div>

              {/* RIGHT STATUS */}
              <div
                className={`
                  hidden md:flex
                  px-4 py-2
                  rounded-2xl
                  text-sm font-bold

                  ${
                    step.done
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
                          bg-slate-100
                          text-slate-500
                        `
                  }
                `}>
                {step.done ? "Terminé" : isRejected ? "Arrêté" : "En attente"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
