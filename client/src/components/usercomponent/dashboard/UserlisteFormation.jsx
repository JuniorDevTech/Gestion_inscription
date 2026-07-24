import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { BookOpen, CalendarDays, BadgeCheck, Clock3 } from "lucide-react";

import { getMyInscriptions } from "../../../features/inscription/inscriptionService";

export default function MyFormationsList() {
  const dispatch = useDispatch();

  const { inscriptions, loading } = useSelector((state) => state.inscriptions);

  /* ================================================= */
  /* ================= FETCH ========================= */
  /* ================================================= */

  useEffect(() => {
    dispatch(getMyInscriptions());
  }, [dispatch]);

  /* ================================================= */
  /* ================= LOADING ======================= */
  /* ================================================= */

  if (loading) {
    return (
      <div
        className="
          bg-white
          rounded-[28px]
          border border-slate-200
          shadow-sm
          p-6
        ">
        Chargement...
      </div>
    );
  }

  /* ================================================= */
  /* ================= EMPTY ========================= */
  /* ================================================= */

  if (!inscriptions?.length) {
    return (
      <div
        className="
          bg-white
          rounded-[28px]
          border border-slate-200
          shadow-sm
          p-8
          text-center
        ">
        <BookOpen size={50} className="mx-auto text-slate-300" />

        <h2
          className="
            mt-4
            text-2xl
            font-bold
            text-slate-700
          ">
          Aucune formation
        </h2>

        <p className="text-slate-500 mt-2">
          Vous n’êtes inscrit à aucune formation.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        bg-white
        rounded-[28px]
        border border-slate-200
        shadow-sm
        p-6
      ">
      {/* HEADER */}
      <div className="mb-8">
        <h2
          className="
            text-2xl
            font-black
            text-slate-800
          ">
          Mes formations
        </h2>

        <p className="text-slate-500 mt-2">
          Liste des formations auxquelles vous êtes inscrit
        </p>
      </div>

      {/* LIST */}
      <div className="space-y-5">
        {inscriptions.map((item) => {
          const approved =
            item.personalValidated &&
            item.formationValidated &&
            item.documentsValidated &&
            item.paymentValidated;

          return (
            <div
              key={item._id}
              className="
                border border-slate-200
                rounded-[24px]
                p-5
                flex flex-col lg:flex-row
                lg:items-center
                lg:justify-between
                gap-5
              ">
              {/* LEFT */}
              <div className="flex items-start gap-4">
                {/* ICON */}
                <div
                  className="
                    w-16 h-16
                    rounded-2xl
                    bg-indigo-100
                    flex items-center justify-center
                    text-indigo-600
                    shrink-0
                  ">
                  <BookOpen size={30} />
                </div>

                {/* INFOS */}
                <div>
                  <h3
                    className="
                      text-xl
                      font-bold
                      text-slate-800
                    ">
                    {item.formation?.title || "Formation"}
                  </h3>

                  <p className="text-slate-500 mt-1">
                    {item.formation?.category || "Catégorie"}
                  </p>

                  {/* DATE */}
                  <div
                    className="
                      flex items-center gap-2
                      mt-4
                      text-sm text-slate-500
                    ">
                    <CalendarDays size={16} />

                    {new Date(item.createdAt).toLocaleDateString("fr-FR")}
                  </div>
                </div>
              </div>

              {/* STATUS */}
              <div>
                {approved ? (
                  <div
                    className="
                      inline-flex items-center gap-2
                      px-4 py-2
                      rounded-full
                      bg-emerald-100
                      text-emerald-700
                      text-sm font-bold
                    ">
                    <BadgeCheck size={18} />
                    Approuvée
                  </div>
                ) : (
                  <div
                    className="
                      inline-flex items-center gap-2
                      px-4 py-2
                      rounded-full
                      bg-orange-100
                      text-orange-700
                      text-sm font-bold
                    ">
                    <Clock3 size={18} />
                    En attente
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
