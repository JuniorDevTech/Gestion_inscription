import { FileText, Download, BadgeCheck, Clock3, XCircle } from "lucide-react";

export default function ReceiptCard({ inscription }) {
  /* ================================================= */
  /* ================= STATUS ======================== */
  /* ================================================= */

  const isValidated = inscription?.paymentValidated === true;

  const isRejected = inscription?.paymentStatus === "échoué";

  /* ================================================= */
  /* ================= STATUS UI ===================== */
  /* ================================================= */

  const statusText = isValidated
    ? "Paiement confirmé"
    : isRejected
      ? "Paiement rejeté"
      : "En attente de validation";

  const statusColor = isValidated
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
          opacity-30

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
      {/* ================= CONTENT ====================== */}
      {/* ================================================= */}

      <div className="relative z-10">
        {/* HEADER */}
        <div
          className="
            flex items-center justify-between
            gap-4
          ">
          <div>
            <h2
              className="
                text-2xl
                font-black
                text-slate-800
              ">
              Reçu de paiement
            </h2>

            <p
              className="
                text-slate-500
                mt-2
              ">
              Informations du paiement et validation administrative.
            </p>
          </div>

          {/* STATUS BADGE */}
          <div
            className={`
              px-4 py-2
              rounded-2xl
              text-sm font-bold
              flex items-center gap-2
              ${statusColor}
            `}>
            {isValidated ? (
              <BadgeCheck size={18} />
            ) : isRejected ? (
              <XCircle size={18} />
            ) : (
              <Clock3 size={18} />
            )}

            {statusText}
          </div>
        </div>

        {/* ================================================= */}
        {/* ================= RECEIPT ====================== */}
        {/* ================================================= */}

        <div
          className="
            mt-8
            rounded-[30px]
            border border-slate-200
            p-6
            bg-slate-50
          ">
          {/* ICON */}
          <div
            className={`
              w-16 h-16
              rounded-2xl
              text-white
              flex items-center justify-center
              shadow-lg

              ${
                isValidated
                  ? "bg-emerald-500"
                  : isRejected
                    ? "bg-red-500"
                    : "bg-amber-500"
              }
            `}>
            <FileText size={30} />
          </div>

          {/* TITLE */}
          <h3
            className="
              mt-6
              text-xl
              font-black
              text-slate-800
            ">
            {isValidated
              ? "Reçu validé"
              : isRejected
                ? "Paiement rejeté"
                : "Validation en attente"}
          </h3>

          {/* INFOS */}
          <div className="mt-6 space-y-4">
            <div
              className="
                flex items-center justify-between
                gap-4
                border-b border-slate-200
                pb-4
              ">
              <span className="text-slate-500">Méthode</span>

              <span
                className="
                  font-bold
                  text-slate-800
                ">
                {inscription?.paymentMethod || "Non défini"}
              </span>
            </div>

            <div
              className="
                flex items-center justify-between
                gap-4
                border-b border-slate-200
                pb-4
              ">
              <span className="text-slate-500">Référence</span>

              <span
                className="
                  font-bold
                  text-slate-800
                ">
                {inscription?.paymentReference || "Non défini"}
              </span>
            </div>

            <div
              className="
                flex items-center justify-between
                gap-4
              ">
              <span className="text-slate-500">Statut</span>

              <span
                className={`
                  font-bold

                  ${
                    isValidated
                      ? "text-emerald-600"
                      : isRejected
                        ? "text-red-600"
                        : "text-amber-600"
                  }
                `}>
                {statusText}
              </span>
            </div>
          </div>

          {/* DOWNLOAD */}
          <button
            disabled={!isValidated}
            className={`
              mt-8
              w-full
              py-4
              rounded-2xl
              font-bold
              flex items-center justify-center gap-3
              transition-all duration-300

              ${
                isValidated
                  ? `
                    bg-gradient-to-r
                    from-indigo-600
                    to-blue-600
                    text-white
                    hover:scale-[1.01]
                  `
                  : `
                    bg-slate-200
                    text-slate-400
                    cursor-not-allowed
                  `
              }
            `}>
            <Download size={20} />

            {isValidated ? "Télécharger le reçu" : "Reçu indisponible"}
          </button>
        </div>
      </div>
    </div>
  );
}
