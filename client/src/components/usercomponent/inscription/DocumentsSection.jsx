import { FileText } from "lucide-react";

import UploadCard from "./UploadCard";

export default function DocumentsSection({ formData, handleFileChange }) {
  return (
    <div
      className="
        relative overflow-hidden
        bg-white
        rounded-[32px]
        border border-slate-200
        shadow-sm
        p-6 md:p-8
      ">
      {/* BACKGROUND */}
      <div
        className="
          absolute -top-20 -right-20
          w-72 h-72
          bg-emerald-100/60
          rounded-full
          blur-3xl
        "
      />

      {/* CONTENT */}
      <div className="relative z-10">
        {/* HEADER */}
        <div className="flex items-start gap-4 mb-10">
          {/* ICON */}
          <div
            className="
              w-16 h-16
              rounded-3xl
              bg-gradient-to-br
              from-emerald-500
              to-green-600
              text-white
              flex items-center justify-center
              shadow-lg
              shadow-emerald-200
              shrink-0
            ">
            <FileText size={30} />
          </div>

          {/* TEXT */}
          <div>
            <div
              className="
                inline-flex items-center gap-2
                px-4 py-2
                rounded-full
                bg-emerald-50
                border border-emerald-100
                text-emerald-700
                text-sm font-semibold
                mb-4
              ">
              Documents académiques
            </div>

            <h2
              className="
                text-3xl
                font-black
                text-slate-800
              ">
              Documents requis
            </h2>

            <p
              className="
                text-slate-500
                mt-3
                max-w-2xl
                leading-relaxed
              ">
              Importez les documents nécessaires pour valider votre dossier
              d’inscription.
            </p>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PHOTO */}
          <UploadCard
            title="Photo d'identité"
            name="photo"
            file={formData.photo}
            onChange={handleFileChange}
            accept="image/*"
          />

          {/* CNI */}
          <UploadCard
            title="Carte nationale d'identité"
            name="identityCard"
            file={formData?.identityCard}
            onChange={handleFileChange}
            accept="image/*,.pdf"
          />

          {/* DIPLOMA */}
          <UploadCard
            title="Diplôme ou attestation"
            name="diploma"
            file={formData?.diploma}
            onChange={handleFileChange}
            accept=".pdf,image/*"
          />

          {/* CV */}
          <UploadCard
            title="CV ou résumé"
            name="cv"
            file={formData?.cv}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
          />
        </div>
      </div>
    </div>
  );
}
