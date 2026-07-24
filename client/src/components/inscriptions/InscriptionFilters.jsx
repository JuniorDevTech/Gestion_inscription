import { Search, SlidersHorizontal } from "lucide-react";

export default function InscriptionFilters({ search, setSearch }) {
  return (
    <div
      className="
        relative overflow-hidden
        bg-white
        rounded-[28px]
        border border-slate-200
        shadow-sm
        p-4 md:p-5
      ">
      {/* BACKGROUND EFFECT */}
      <div
        className="
          absolute -top-10 -right-10
          w-40 h-40
          bg-indigo-100/60
          rounded-full
          blur-3xl
        "
      />

      <div className="relative z-10 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        {/* SEARCH INPUT */}
        <div className="relative flex-1">
          {/* ICON */}
          <Search
            className="
              absolute left-4 top-1/2
              -translate-y-1/2
              text-slate-400
            "
            size={20}
          />

          {/* INPUT */}
          <input
            type="text"
            placeholder="Rechercher un étudiant..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              bg-slate-50
              border border-slate-200
              rounded-2xl
              pl-12 pr-4 py-3.5
              text-slate-700
              placeholder:text-slate-400
              outline-none
              transition-all duration-300

              focus:bg-white
              focus:border-indigo-500
              focus:ring-4 focus:ring-indigo-100
            "
          />
        </div>

        {/* FILTER BUTTON */}
        <button
          className="
            flex items-center justify-center gap-2
            px-5 py-3.5
            rounded-2xl
            bg-gradient-to-r from-indigo-600 to-blue-600
            text-white
            font-medium
            shadow-lg shadow-indigo-200
            hover:shadow-xl
            hover:scale-[1.02]
            transition-all duration-300
          ">
          <SlidersHorizontal size={18} />

          <span>Filtres</span>
        </button>
      </div>
    </div>
  );
}
