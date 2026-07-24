import { CreditCard, BadgeCheck, Clock3, XCircle } from "lucide-react";

export default function PaymentSuccessCard({ inscription }) {
  /* ================================================= */
  /* ================= STATUS ======================== */
  /* ================================================= */

  const isValidated = inscription?.paymentValidated === true;

  const isRejected = inscription?.paymentStatus === "échoué";

  const isPending = !isValidated && !isRejected;

  /* ================================================= */
  /* ================= STATUS TEXT =================== */
  /* ================================================= */

  const statusText = isValidated
    ? "Paiement confirmé"
    : isRejected
      ? "Paiement rejeté"
      : "Validation en attente";

  /* ================================================= */
  /* ================= PRICE ========================= */
  /* ================================================= */

  const price = inscription?.formation?.price || inscription?.price || 0;

  /* ================================================= */
  /* ================= GRADIENT ====================== */
  /* ================================================= */

  const gradient = isValidated
    ? `
    from-emerald-500
    to-green-600
  `
    : isRejected
      ? `
      from-red-500
      to-rose-600
    `
      : isPending
        ? `
        from-amber-500
        to-orange-600
      `
        : "";

  return (
    <div
      className={`
        relative overflow-hidden
        bg-gradient-to-r
        ${gradient}
        rounded-[32px]
        p-8 md:p-10
        text-white
        shadow-xl
      `}>
      {/* BACKGROUND */}
      <div
        className="
          absolute -top-20 -right-20
          w-72 h-72
          rounded-full
          bg-white/10
          blur-3xl
        "
      />

      {/* CONTENT */}
      <div
        className="
          relative z-10
          flex items-center justify-between
          gap-8
          flex-wrap
        ">
        {/* LEFT */}
        <div>
          {/* BADGE */}
          <div
            className="
              inline-flex items-center gap-2
              px-4 py-2
              rounded-2xl
              bg-white/15
              backdrop-blur-xl
              text-sm font-bold
            ">
            {isValidated ? (
              <BadgeCheck size={18} />
            ) : isRejected ? (
              <XCircle size={18} />
            ) : (
              <Clock3 size={18} />
            )}

            {statusText}
          </div>

          {/* TITLE */}
          <p
            className="
              mt-6
              text-white/80
              font-semibold
              uppercase
              tracking-wider
              text-sm
            ">
            Paiement inscription
          </p>

          {/* PRICE */}
          <h2
            className="
              mt-4
              text-5xl md:text-6xl
              font-black
            ">
            {Number(price).toLocaleString()} FCFA
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
    mt-5
    text-lg
    text-white/90
    max-w-xl
  ">
            {isValidated
              ? "Votre paiement a été validé avec succès."
              : isRejected
                ? "Le paiement a été rejeté."
                : isPending
                  ? "Votre paiement est en cours de vérification."
                  : ""}
          </p>

          {/* INFOS */}
          <div
            className="
              mt-6
              flex flex-wrap items-center gap-3
            ">
            <div
              className="
                px-5 py-3
                rounded-2xl
                bg-white/10
                backdrop-blur-xl
                text-sm font-bold
              ">
              Référence : {inscription?.paymentReference || "N/A"}
            </div>

            <div
              className="
                px-5 py-3
                rounded-2xl
                bg-white/10
                backdrop-blur-xl
                text-sm font-bold
              ">
              {inscription?.paymentMethod || "Méthode inconnue"}
            </div>
          </div>
        </div>

        {/* ICON */}
        <div
          className="
            shrink-0
            w-28 h-28
            rounded-[32px]
            bg-white/10
            backdrop-blur-xl
            flex items-center justify-center
            border border-white/10
          ">
          <CreditCard size={52} />
        </div>
      </div>
    </div>
  );
}
