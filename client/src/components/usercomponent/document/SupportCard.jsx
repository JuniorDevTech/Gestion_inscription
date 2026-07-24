export default function SupportCard() {
  return (
    <div
      className="
        bg-gradient-to-r
        from-slate-900
        to-slate-800
        rounded-[30px]
        p-6
        text-white
      ">
      <h2
        className="
          text-xl
          font-bold
        ">
        Besoin d’assistance ?
      </h2>

      <p
        className="
          mt-3
          text-slate-300
          leading-relaxed
        ">
        Notre équipe reste disponible pour vous aider concernant votre
        inscription et le suivi de votre dossier académique.
      </p>

      <button
        className="
          mt-6
          w-full
          bg-white
          text-slate-900
          py-4
          rounded-2xl
          font-bold
          hover:bg-slate-100
          transition
        ">
        Contacter le support
      </button>
    </div>
  );
}
