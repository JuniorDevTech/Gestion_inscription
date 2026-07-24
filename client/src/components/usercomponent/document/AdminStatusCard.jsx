import { Clock3, BadgeCheck, XCircle, ShieldCheck } from "lucide-react";

export default function AdminStatusCard({ inscription }) {
  /* ================================================= */
  /* ================= STATUS ======================== */
  /* ================================================= */

  const isValidated =
    inscription?.personalValidated &&
    inscription?.formationValidated &&
    inscription?.documentsValidated &&
    inscription?.paymentValidated;

  const isRejected = inscription?.status === "rejetée";

  // eslint-disable-next-line no-unused-vars
  const isPending = !isValidated && !isRejected;

  /* ================================================= */
  /* ================= CONTENT ======================= */
  /* ================================================= */

  const statusTitle = isValidated
    ? "Dossier validé"
    : isRejected
      ? "Dossier rejeté"
      : "En attente de validation";

  const statusDescription = isValidated
    ? "Votre dossier a été validé avec succès par l’administration."
    : isRejected
      ? "Votre dossier a été rejeté. Veuillez contacter l’administration pour plus d’informations."
      : "Votre dossier est actuellement en cours d’analyse par l’administration.";

  const statusColor = isValidated
    ? `
      bg-emerald-50
      border-emerald-200
    `
    : isRejected
      ? `
        bg-red-50
        border-red-200
      `
      : `
        bg-amber-50
        border-amber-200
      `;

  const iconColor = isValidated
    ? `
      bg-emerald-100
      text-emerald-600
    `
    : isRejected
      ? `
        bg-red-100
        text-red-600
      `
      : `
        bg-amber-100
        text-amber-600
      `;

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
              ? "bg-emerald-300"
              : isRejected
                ? "bg-red-300"
                : "bg-amber-300"
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
              Statut administratif
            </h2>

            <p
              className="
                mt-2
                text-slate-500
              ">
              État actuel du traitement administratif de votre inscription.
            </p>
          </div>

          {/* STATUS BADGE */}
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
              ? "Validation confirmée"
              : isRejected
                ? "Dossier rejeté"
                : "Analyse en cours"}
          </div>
        </div>

        {/* ================================================= */}
        {/* ================= STATUS CONTENT ============== */}
        {/* ================================================= */}

        <div
          className={`
            mt-8
            rounded-[32px]
            border
            p-6 md:p-8
            ${statusColor}
          `}>
          {/* TOP */}
          <div
            className="
              flex items-start justify-between
              gap-6 flex-wrap
            ">
            {/* LEFT */}
            <div>
              {/* ICON */}
              <div
                className={`
                  w-20 h-20
                  rounded-3xl
                  flex items-center justify-center
                  shadow-sm
                  ${iconColor}
                `}>
                {isValidated ? (
                  <ShieldCheck size={38} />
                ) : isRejected ? (
                  <XCircle size={38} />
                ) : (
                  <Clock3 size={38} />
                )}
              </div>

              {/* TITLE */}
              <h3
                className="
                  mt-6
                  text-3xl
                  font-black
                  text-slate-800
                ">
                {statusTitle}
              </h3>

              {/* DESCRIPTION */}
              <p
                className="
                  mt-4
                  text-slate-600
                  leading-relaxed
                  max-w-2xl
                ">
                {statusDescription}
              </p>
            </div>

            {/* RIGHT INFO */}
            <div
              className="
                shrink-0
                rounded-3xl
                bg-white/70
                backdrop-blur-xl
                border border-white/50
                px-6 py-5
                shadow-sm
              ">
              <p
                className="
                  text-sm
                  text-slate-500
                ">
                Dernière mise à jour
              </p>

              <h4
                className="
                  mt-2
                  text-lg
                  font-black
                  text-slate-800
                ">
                {new Date(inscription?.updatedAt).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </h4>
            </div>
          </div>

          {/* BOTTOM ALERT */}
          <div
            className={`
              mt-8
              rounded-2xl
              px-5 py-4
              text-sm font-medium

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
            {isValidated
              ? "Votre inscription est officiellement validée."
              : isRejected
                ? "Votre dossier nécessite une nouvelle soumission ou une correction."
                : "Le traitement administratif peut prendre quelques instants."}
          </div>
        </div>
      </div>
    </div>
  );
}
