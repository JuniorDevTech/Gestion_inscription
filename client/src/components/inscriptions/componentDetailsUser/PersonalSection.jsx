import { User } from "lucide-react";

import SectionCard from "../SectionCard";
import GridItem from "../GridItem";

export default function PersonalSection({
  inscription,
  validated,
  onValidate,
  onReject,
}) {
  return (
    <SectionCard
      icon={User}
      title="Informations personnelles"
      validated={validated}
      onValidate={onValidate}
      onReject={onReject}>
      <GridItem
        label="Nom"
        value={`${inscription?.firstName} ${inscription?.lastName}`}
      />

      <GridItem label="Email" value={inscription?.email} />

      <GridItem label="Téléphone" value={inscription?.phone} />

      <GridItem label="Adresse" value={inscription?.address} />
    </SectionCard>
  );
}
