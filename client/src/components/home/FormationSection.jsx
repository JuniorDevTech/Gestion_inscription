import { Clock3, Users, ArrowRight, BadgeCheck, Layers3 } from "lucide-react";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getFormations } from "../../features/formations/formationService";

export default function FormationSection() {
  const dispatch = useDispatch();

  /* ================================================= */
  /* ================= REDUX ========================= */
  /* ================================================= */

  const { formations, loading } = useSelector((state) => state.formations);

  /* ================================================= */
  /* ================= FETCH ========================= */
  /* ================================================= */

  useEffect(() => {
    dispatch(getFormations());
  }, [dispatch]);

  return (
    <section className="relative py-28 bg-white overflow-hidden">
      {/* BACKGROUND EFFECT */}
      <div
        className="
          absolute top-0 right-0
          w-96 h-96
          bg-indigo-100
          rounded-full
          blur-3xl
          opacity-40
        "
      />

      <div
        className="
          absolute bottom-0 left-0
          w-96 h-96
          bg-purple-100
          rounded-full
          blur-3xl
          opacity-40
        "
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span
            className="
              inline-block
              bg-purple-100
              text-purple-700
              px-5 py-2
              rounded-full
              text-sm
              font-semibold
              mb-6
            ">
            FORMATIONS DISPONIBLES
          </span>

          <h2
            className="
              text-5xl md:text-6xl
              font-bold
              text-gray-900
              leading-tight
              mb-6
            ">
            Développez vos compétences avec
            <span
              className="
                block
                bg-gradient-to-r
                from-indigo-600
                to-purple-600
                bg-clip-text
                text-transparent
              ">
              des formations certifiantes
            </span>
          </h2>

          <p
            className="
              text-xl
              text-gray-500
              leading-relaxed
            ">
            Choisissez parmi nos programmes conçus pour répondre aux besoins
            actuels du marché professionnel.
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div
            className="
              text-center
              py-20
              text-slate-500
              text-lg
            ">
            Chargement des formations...
          </div>
        )}

        {/* EMPTY */}
        {!loading && !formations?.length && (
          <div
            className="
                text-center
                py-20
              ">
            <h3
              className="
                  text-3xl
                  font-bold
                  text-slate-800
                ">
              Aucune formation disponible
            </h3>

            <p
              className="
                  text-slate-500
                  mt-4
                ">
              Les formations apparaîtront ici automatiquement.
            </p>
          </div>
        )}

        {/* FORMATIONS GRID */}
        <div className="grid lg:grid-cols-2 gap-8">
          {formations?.map((formation) => (
            <div
              key={formation._id}
              className="
                  group relative
                  bg-white
                  border border-gray-100
                  rounded-3xl
                  p-8
                  shadow-sm
                  hover:shadow-2xl
                  hover:-translate-y-2
                  transition duration-300
                  overflow-hidden
                ">
              {/* IMAGE */}
              <div
                className="
                    relative
                    h-56
                    rounded-3xl
                    overflow-hidden
                    mb-8
                  ">
                <img
                  src={`http://localhost:5000${formation.image}`}
                  alt={formation.title}
                  className="
                      w-full h-full
                      object-cover
                      group-hover:scale-110
                      transition duration-500
                    "
                />

                <div
                  className="
                      absolute inset-0
                      bg-gradient-to-t
                      from-black/50
                      to-transparent
                    "
                />

                <div
                  className="
                      absolute top-4 left-4
                      bg-white/90
                      backdrop-blur-sm
                      px-4 py-2
                      rounded-2xl
                      text-sm
                      font-bold
                      text-slate-800
                    ">
                  {formation.category}
                </div>
              </div>

              {/* TOP */}
              <div
                className="
                    flex items-center
                    justify-between
                    mb-8
                  ">
                <span
                  className="
                      bg-green-100
                      text-green-700
                      px-4 py-2
                      rounded-full
                      text-sm
                      font-semibold
                      flex items-center gap-2
                    ">
                  <BadgeCheck size={16} />
                  Inscriptions ouvertes
                </span>

                <span
                  className="
                      text-indigo-600
                      font-black
                      text-2xl
                    ">
                  {formation.price} FCFA
                </span>
              </div>

              {/* TITLE */}
              <h3
                className="
                    text-3xl
                    font-bold
                    text-gray-900
                    mb-5
                    leading-snug
                  ">
                {formation.title}
              </h3>

              {/* DESCRIPTION */}
              <p
                className="
                    text-gray-500
                    text-lg
                    leading-relaxed
                    mb-8
                    line-clamp-3
                  ">
                {formation.description}
              </p>

              {/* TAGS */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div
                  className="
                      flex items-center gap-2
                      bg-gray-100
                      px-4 py-2
                      rounded-xl
                      text-gray-700
                    ">
                  <Clock3 size={18} />

                  <span>{formation.duration}</span>
                </div>

                <div
                  className="
                      flex items-center gap-2
                      bg-gray-100
                      px-4 py-2
                      rounded-xl
                      text-gray-700
                    ">
                  <Layers3 size={18} />

                  <span>{formation.category}</span>
                </div>

                <div
                  className="
                      flex items-center gap-2
                      bg-indigo-50
                      px-4 py-2
                      rounded-xl
                      text-indigo-700
                    ">
                  <BadgeCheck size={18} />

                  <span>{formation.level}</span>
                </div>
              </div>

              {/* FOOTER */}
              <div
                className="
                    flex items-center
                    justify-between
                    pt-6
                    border-t border-gray-100
                  ">
                <div
                  className="
                      flex items-center gap-3
                      text-gray-500
                    ">
                  <Users size={20} />

                  <span>Formation disponible</span>
                </div>

                <button
                  className="
                      flex items-center gap-2
                      text-indigo-600
                      font-semibold
                      group-hover:gap-3
                      transition-all
                    ">
                  Voir détails
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* HOVER BORDER */}
              <div
                className="
                    absolute bottom-0 left-0
                    w-0 h-1
                    bg-gradient-to-r
                    from-indigo-500
                    to-purple-600
                    group-hover:w-full
                    transition-all duration-500
                  "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
