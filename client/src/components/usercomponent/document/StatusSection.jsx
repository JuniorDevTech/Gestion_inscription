import { FileText, CreditCard, Clock3 } from "lucide-react";

import StatusCard from "./StatusCard";

export default function StatusSection({ inscription }) {
  /* ================================================= */
  /* ================= GLOBAL VALIDATION ============= */
  /* ================================================= */

  const isValidated =
    inscription?.personalValidated &&
    inscription?.formationValidated &&
    inscription?.documentsValidated &&
    inscription?.paymentValidated;

  const isRejected = inscription?.status === "rejetée";

  const isPending = !isValidated && !isRejected;

  /* ================================================= */
  /* ================= DOSSIER STATUS ================ */
  /* ================================================= */

  const dossierStatus = isValidated
    ? "Validé"
    : isRejected
      ? "Rejeté"
      : isPending
        ? "En attente"
        : "";

  /* ================================================= */
  /* ================= PAYMENT STATUS ================ */
  /* ================================================= */

  const paymentStatus = inscription?.paymentValidated
    ? "Confirmé"
    : inscription?.paymentStatus === "échoué"
      ? "Échoué"
      : "En attente";

  /* ================================================= */
  /* ================= VALIDATION ==================== */
  /* ================================================= */

  const validationStatus = isValidated
    ? "Validé"
    : isRejected
      ? "Rejeté"
      : isPending
        ? "En attente"
        : "";

  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
      ">
      {/* DOSSIER */}
      <StatusCard
        title="Dossier"
        value={dossierStatus}
        icon={FileText}
        color={
          isValidated
            ? "bg-emerald-500"
            : isRejected
              ? "bg-red-500"
              : isPending
                ? "bg-amber-500"
                : ""
        }
      />

      {/* PAYMENT */}
      <StatusCard
        title="Paiement"
        value={paymentStatus}
        icon={CreditCard}
        color={
          inscription?.paymentValidated
            ? "bg-emerald-500"
            : inscription?.paymentStatus === "échoué"
              ? "bg-red-500"
              : "bg-amber-500"
        }
      />

      {/* VALIDATION */}
      <StatusCard
        title="Validation"
        value={validationStatus}
        icon={Clock3}
        color={
          isValidated
            ? "bg-emerald-500"
            : isRejected
              ? "bg-red-500"
              : "bg-amber-500"
        }
      />
    </div>
  );
}
