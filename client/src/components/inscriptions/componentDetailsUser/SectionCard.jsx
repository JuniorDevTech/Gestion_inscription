export default function SectionCard({
  icon: Icon,
  title,
  children,
  validated,
  onValidate,
  onReject,
}) {
  return (
    <div
      className="
        bg-white/90
        backdrop-blur-xl
        border border-white/40
        rounded-[30px]
        p-5 sm:p-6
        shadow-sm
        hover:shadow-xl
        transition-all duration-300
      ">
      {/* HEADER */}
      <div
        className="
          flex flex-col sm:flex-row
          sm:items-center
          justify-between
          gap-4
          mb-6
        ">
        <div className="flex items-center gap-4">
          <div
            className="
              w-14 h-14
              rounded-2xl
              bg-gradient-to-br
              from-indigo-500
              to-blue-500
              text-white
              flex items-center justify-center
              shadow-lg
            ">
            <Icon size={24} />
          </div>

          <div>
            <h3 className="text-xl font-black text-slate-800">{title}</h3>

            <p className="text-sm text-slate-500 mt-1">
              Vérification de la section
            </p>
          </div>
        </div>

        <div
          className={`
            px-4 py-2 rounded-2xl
            text-sm font-bold w-fit

            ${
              validated
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
            }
          `}>
          {validated ? "Validé" : "En attente"}
        </div>
      </div>

      {/* CONTENT */}
      <div className="grid md:grid-cols-2 gap-4">{children}</div>

      {/* ACTIONS */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={onValidate}
          className="
            flex-1 py-3.5 rounded-2xl
            bg-emerald-600 hover:bg-emerald-700
            text-white font-bold
            transition-all duration-300
          ">
          Valider
        </button>

        <button
          onClick={onReject}
          className="
            flex-1 py-3.5 rounded-2xl
            bg-red-600 hover:bg-red-700
            text-white font-bold
            transition-all duration-300
          ">
          Refuser
        </button>
      </div>
    </div>
  );
}
