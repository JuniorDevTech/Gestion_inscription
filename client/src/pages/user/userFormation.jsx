import { useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Sparkles, GraduationCap, Search } from "lucide-react";

import FormationHero from "../../components/usercomponent/formations/FormationHero";

import FormationStatsSection from "../../components/usercomponent/formations/FormationStatsSection";

import FormationGrid from "../../components/usercomponent/formations/FormationGrid";

import { getFormations } from "../../features/formations/formationService";

export default function UserFormation() {
  const dispatch = useDispatch();

  /* ================================================= */
  /* ================= REDUX ========================= */
  /* ================================================= */

  const { formations, loading, error } = useSelector(
    (state) => state.formations,
  );

  /* ================================================= */
  /* ================= FILTERS ======================= */
  /* ================================================= */

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("Tous");

  /* ================================================= */
  /* ================= FETCH ========================= */
  /* ================================================= */

  useEffect(() => {
    dispatch(getFormations());
  }, [dispatch]);

  /* ================================================= */
  /* ================= CATEGORIES ==================== */
  /* ================================================= */

  const categories = useMemo(() => {
    const unique = formations.map((formation) => formation.category);

    return ["Tous", ...new Set(unique)];
  }, [formations]);

  /* ================================================= */
  /* ================= FILTERED ====================== */
  /* ================================================= */

  const filteredFormations = useMemo(() => {
    return formations.filter((formation) => {
      const matchSearch = formation.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "Tous" ? true : formation.category === category;

      return matchSearch && matchCategory;
    });
  }, [formations, search, category]);

  return (
    <div className="space-y-8">
      {/* HERO */}
      <FormationHero />

      {/* FILTER SECTION */}
      <section
        className="
          relative overflow-hidden
          bg-white
          border border-slate-200
          rounded-[32px]
          shadow-sm
          p-6 md:p-8
        ">
        {/* BACKGROUND */}
        <div
          className="
            absolute -top-20 -right-20
            w-72 h-72
            bg-indigo-100/70
            rounded-full
            blur-3xl
          "
        />

        <div
          className="
            absolute -bottom-16 -left-10
            w-60 h-60
            bg-blue-100/50
            rounded-full
            blur-3xl
          "
        />

        {/* CONTENT */}
        <div className="relative z-10">
          {/* TOP */}
          <div
            className="
              flex flex-col lg:flex-row
              lg:items-center
              lg:justify-between
              gap-6
              mb-8
            ">
            {/* LEFT */}
            <div>
              <div
                className="
                  inline-flex items-center gap-2
                  px-4 py-2
                  rounded-full
                  bg-indigo-50
                  border border-indigo-100
                  text-indigo-700
                  text-sm font-semibold
                  mb-4
                ">
                <Sparkles size={16} />
                Catalogue des formations
              </div>

              <h1
                className="
                  text-3xl md:text-4xl
                  font-black
                  text-slate-800
                  leading-tight
                ">
                Développez vos compétences
              </h1>

              <p
                className="
                  mt-3
                  text-slate-500
                  max-w-2xl
                  leading-relaxed
                ">
                Découvrez des formations professionnelles conçues pour accélérer
                votre carrière et renforcer votre expertise dans les métiers du
                numérique.
              </p>
            </div>

            {/* STATS */}
            <div
              className="
                flex items-center gap-4
                p-5
                rounded-3xl
                bg-slate-50
                border border-slate-200
                min-w-[240px]
              ">
              <div
                className="
                  w-16 h-16
                  rounded-3xl
                  bg-gradient-to-br
                  from-indigo-600
                  to-blue-600
                  text-white
                  flex items-center justify-center
                  shadow-lg
                ">
                <GraduationCap size={32} />
              </div>

              <div>
                <p className="text-slate-500 text-sm">Formations disponibles</p>

                <h2
                  className="
                    text-4xl
                    font-black
                    text-slate-800
                    leading-none
                    mt-1
                  ">
                  {formations.length}
                </h2>
              </div>
            </div>
          </div>

          {/* SEARCH + FILTER */}
          <div
            className="
              flex flex-col lg:flex-row
              gap-4
            ">
            {/* SEARCH */}
            <div className="relative flex-1">
              <Search
                size={20}
                className="
                  absolute left-5 top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher une formation..."
                className="
                  w-full
                  h-16
                  pl-14 pr-5
                  rounded-2xl
                  border border-slate-200
                  bg-slate-50
                  text-slate-700
                  outline-none
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-100
                  transition-all duration-300
                "
              />
            </div>

            {/* CATEGORY */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="
                h-16
                px-6
                rounded-2xl
                border border-slate-200
                bg-slate-50
                text-slate-700
                outline-none
                focus:border-indigo-500
                focus:ring-4
                focus:ring-indigo-100
                transition-all duration-300
                min-w-[240px]
              ">
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* STATS */}
      <FormationStatsSection total={formations.length} />

      {/* LOADING */}
      {loading && (
        <div
          className="
            bg-white
            rounded-[32px]
            border border-slate-200
            p-14
            text-center
            shadow-sm
          ">
          <div
            className="
              w-14 h-14
              border-4
              border-indigo-200
              border-t-indigo-600
              rounded-full
              animate-spin
              mx-auto
            "
          />

          <p className="mt-5 text-slate-500 font-medium">
            Chargement des formations...
          </p>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div
          className="
            bg-red-50
            border border-red-200
            text-red-700
            rounded-[28px]
            p-6
            shadow-sm
          ">
          {error}
        </div>
      )}

      {/* EMPTY */}
      {!loading && !filteredFormations.length && (
        <div
          className="
              bg-white
              rounded-[32px]
              border border-slate-200
              p-14
              text-center
              shadow-sm
            ">
          <div
            className="
                w-24 h-24
                rounded-3xl
                bg-slate-100
                flex items-center justify-center
                mx-auto
              ">
            <GraduationCap size={42} className="text-slate-400" />
          </div>

          <h2
            className="
                mt-6
                text-3xl
                font-black
                text-slate-800
              ">
            Aucune formation
          </h2>

          <p
            className="
                mt-3
                text-slate-500
                max-w-lg
                mx-auto
                leading-relaxed
              ">
            Aucune formation ne correspond actuellement à votre recherche.
          </p>
        </div>
      )}

      {/* GRID */}
      {!!filteredFormations.length && (
        <FormationGrid formations={filteredFormations} />
      )}
    </div>
  );
}
