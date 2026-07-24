import { GraduationCap } from "lucide-react";

import SectionCard from "../SectionCard";

import GridItem from "../GridItem";

export default function FormationSection({
  inscription,
  validated,
  onValidate,
  onReject,
}) {
  return (
    <SectionCard
      icon={GraduationCap}
      title="Formation"
      validated={validated}
      onValidate={onValidate}
      onReject={onReject}>
      <GridItem label="Formation" value={inscription?.formation?.title} />

      <GridItem label="Catégorie" value={inscription?.formation?.category} />

      <GridItem label="Niveau" value={inscription?.formation?.level} />

      <GridItem label="Durée" value={inscription?.formation?.duration} />

      <GridItem
        label="Prix"
        value={`${Number(
          inscription?.formation?.price || 0,
        ).toLocaleString()} FCFA`}
      />

      <GridItem label="Statut" value={inscription?.formation?.status} />
    </SectionCard>
  );
}
