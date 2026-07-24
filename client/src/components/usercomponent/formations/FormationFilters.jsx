import { Search, Filter } from "lucide-react";

export default function FormationFilters() {
  return (
    <div
      className="
        bg-white
        rounded-[30px]
        border border-slate-200
        shadow-sm
        p-5
      ">
      <div className="flex flex-col lg:flex-row gap-4">
        <div
          className="
            flex-1 flex items-center gap-3
            bg-slate-100
            rounded-2xl
            px-4 py-4
          ">
          <Search size={20} className="text-slate-400" />

          <input
            type="text"
            placeholder="Rechercher une formation..."
            className="
              bg-transparent
              outline-none
              w-full
              text-slate-700
            "
          />
        </div>

        <button
          className="
            px-6 py-4
            rounded-2xl
            bg-slate-100
            hover:bg-slate-200
            transition
            flex items-center gap-3
            font-semibold text-slate-700
          ">
          <Filter size={20} />
          Filtres
        </button>
      </div>
    </div>
  );
}
