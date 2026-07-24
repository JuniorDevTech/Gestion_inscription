import { BadgeCheck, Clock3, XCircle } from "lucide-react";

export default function TimelineCard({ inscription }) {
  /* ================================================= */
  /* ================= STEPS ========================= */
  /* ================================================= */

  const steps = [
    {
      title: "Compte créé",

      desc: "Votre compte utilisateur a été enregistré",

      done: !!inscription?.user,
    },

    {
      title: "Documents envoyés",

      desc: "Les documents requis ont été importés",

      done: inscription?.documentsValidated === true,
    },

    {
      title: "Paiement validé",

      desc: "Le paiement de l’inscription a été confirmé",

      done: inscription?.paymentValidated === true,
    },

    {
      title: "Analyse administrative",

      desc: inscription?.formationValidated
        ? "Votre dossier a été analysé"
        : "Votre dossier est en cours de vérification",

      done: inscription?.formationValidated === true,
    },

    {
      title: "Validation finale",

      desc:
        inscription?.status === "validée"
          ? "Votre dossier a été validé avec succès"
          : inscription?.status === "rejetée"
            ? "Votre dossier a été rejeté"
            : "En attente de validation définitive",

      done: inscription?.status === "validée",
    },
  ];

  return (
    <div
      className="
        bg-white
        rounded-[30px]
        border border-slate-200
        shadow-sm
        p-6 md:p-8
      ">
      <h2
        className="
          text-2xl
          font-bold
          text-slate-800
        ">
        Suivi du dossier
      </h2>

      <div className="mt-8 space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-5">
            {/* ICON */}
            <div className="flex flex-col items-center">
              <div
                className={`
                    w-12 h-12
                    rounded-2xl
                    flex items-center justify-center

                    ${
                      step.done
                        ? "bg-emerald-100 text-emerald-600"
                        : inscription?.status === "rejetée"
                          ? "bg-red-100 text-red-600"
                          : "bg-slate-100 text-slate-400"
                    }
                  `}>
                {step.done ? (
                  <BadgeCheck size={22} />
                ) : inscription?.status === "rejetée" ? (
                  <XCircle size={22} />
                ) : (
                  <Clock3 size={22} />
                )}
              </div>

              {index !== steps.length - 1 && (
                <div
                  className="
                      w-[2px]
                      flex-1
                      bg-slate-200
                      mt-2
                    "
                />
              )}
            </div>

            {/* TEXT */}
            <div>
              <h3
                className="
                    font-bold
                    text-slate-800
                  ">
                {step.title}
              </h3>

              <p
                className="
                    text-slate-500
                    mt-1
                  ">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
