import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
export default function SubmitSection({ loading }) {
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
          bg-indigo-100/60
          rounded-full
          blur-3xl
        "
      />

      {/* CONTENT */}
      <div
        className="
          relative z-10
          flex flex-col xl:flex-row
          items-start xl:items-center
          justify-between
          gap-8
        ">
        {/* LEFT */}
        <div className="max-w-2xl">
          {/* BADGE */}
          <div
            className="
              inline-flex items-center gap-2
              px-4 py-2
              rounded-full
              bg-indigo-50
              border border-indigo-100
              text-indigo-700
              text-sm font-semibold
              mb-5
            ">
            <ShieldCheck size={16} />
            Validation finale
          </div>

          {/* TITLE */}
          <h3
            className="
              text-3xl md:text-4xl
              font-black
              text-slate-800
              leading-tight
            ">
            Finaliser votre inscription
          </h3>

          {/* DESCRIPTION */}
          <p
            className="
              text-slate-500
              mt-4
              leading-relaxed
              text-base md:text-lg
            ">
            Vérifiez attentivement vos informations avant de soumettre votre
            dossier d’inscription à l’administration académique.
          </p>

          {/* INFOS */}
          <div className="flex flex-wrap gap-4 mt-6">
            <div
              className="
                flex items-center gap-2
                px-4 py-2
                rounded-2xl
                bg-emerald-50
                border border-emerald-100
                text-emerald-700
                text-sm font-semibold
              ">
              <CheckCircle2 size={18} />
              Paiement simulé sécurisé
            </div>

            <div
              className="
                flex items-center gap-2
                px-4 py-2
                rounded-2xl
                bg-slate-50
                border border-slate-200
                text-slate-600
                text-sm font-semibold
              ">
              Dossier vérifié automatiquement
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className={`
            relative overflow-hidden
            shrink-0
            min-w-[280px]
            px-8 py-5
            rounded-[24px]
            text-white
            font-black
            text-lg
            shadow-2xl
            transition-all duration-300

            ${
              loading
                ? `
                  bg-slate-400
                  cursor-not-allowed
                `
                : `
                  bg-gradient-to-r
                  from-indigo-600
                  via-blue-600
                  to-cyan-500
                  hover:scale-105
                  hover:shadow-indigo-500/30
                `
            }
          `}>
          {/* GLOW */}
          <div
            className="
              absolute inset-0
              bg-white/10
            "
          />

          {/* CONTENT */}
          <div
            className="
              relative z-10
              flex items-center justify-center
              gap-3
            ">
            {loading ? (
              <>
                <Loader2 size={24} className="animate-spin" />

                <span>Traitement...</span>
              </>
            ) : (
              <>
                <CheckCircle2 size={24} />

                <span>Soumettre l’inscription</span>
              </>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
