import { CreditCard } from "lucide-react";

import SectionCard from "../SectionCard";

import GridItem from "../GridItem";

export default function PaymentSection({
  inscription,
  validated,
  onValidate,
  onReject,
}) {
  return (
    <SectionCard
      icon={CreditCard}
      title="Paiement"
      validated={validated}
      onValidate={onValidate}
      onReject={onReject}>
      <GridItem label="Méthode" value={inscription?.paymentMethod} />

      <GridItem label="Référence" value={inscription?.paymentReference} />

      <GridItem label="Statut" value={inscription?.paymentStatus} />

      <GridItem
        label="Montant"
        value={`${Number(
          inscription?.formation?.price || 0,
        ).toLocaleString()} FCFA`}
      />
    </SectionCard>
  );
}
