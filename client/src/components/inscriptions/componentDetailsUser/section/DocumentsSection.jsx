import { FileText } from "lucide-react";

import SectionCard from "../SectionCard";

import DocumentsGrid from "../DocumentsGrid";

export default function DocumentsSection({
  inscription,
  validated,
  onValidate,
  onReject,
}) {
  return (
    <SectionCard
      icon={FileText}
      title="Documents"
      validated={validated}
      onValidate={onValidate}
      onReject={onReject}>
      <DocumentsGrid inscription={inscription} />
    </SectionCard>
  );
}
