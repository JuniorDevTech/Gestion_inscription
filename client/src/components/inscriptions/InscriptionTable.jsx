/* eslint-disable no-unused-vars */

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { User2, GraduationCap, CalendarDays } from "lucide-react";

import StatusBadge from "./StatusBadge";

import ActionButtons from "./ActionButtons";

import { getInscriptions } from "../../features/inscription/inscriptionService";

export default function InscriptionTable() {
  const dispatch = useDispatch();

  const { inscriptions, loading, error } = useSelector(
    (state) => state.inscriptions,
  );

  /* ================================================= */
  /* ================= FETCH ========================= */
  /* ================================================= */

  useEffect(() => {
    dispatch(getInscriptions());
  }, [dispatch]);

  /* ================================================= */
  /* ================= LOADING ======================= */
  /* ================================================= */

  if (loading) {
    return (
      <div
        className="
          bg-white
          rounded-[30px]
          border border-slate-200
          shadow-sm
          p-10
          text-center
          text-slate-500
        ">
        Chargement des inscriptions...
      </div>
    );
  }

  /* ================================================= */
  /* ================= ERROR ========================= */
  /* ================================================= */

  if (error) {
    return (
      <div
        className="
          bg-red-50
          border border-red-200
          text-red-700
          rounded-2xl
          p-6
        ">
        {error}
      </div>
    );
  }

  return (
    <div
      className="
        relative overflow-hidden
        bg-white
        rounded-[30px]
        border border-slate-200
        shadow-sm
      ">
      {/* BACKGROUND EFFECT */}
      <div
        className="
          absolute -top-10 -right-10
          w-52 h-52
          bg-indigo-100/60
          rounded-full
          blur-3xl
        "
      />

      {/* HEADER */}
      <div
        className="
          relative z-10
          px-6 py-5
          border-b border-slate-200
          flex flex-col md:flex-row
          md:items-center
          md:justify-between
          gap-4
        ">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Liste des inscriptions
          </h2>

          <p className="text-slate-500 mt-1 text-sm">
            Gestion complète des demandes d’inscription
          </p>
        </div>

        <div
          className="
            px-4 py-2
            rounded-2xl
            bg-indigo-50
            border border-indigo-100
            text-indigo-700
            text-sm font-semibold
            w-fit
          ">
          {inscriptions?.length || 0} inscriptions
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto relative z-10">
        <table className="w-full min-w-[900px]">
          {/* TABLE HEAD */}
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-slate-500 text-sm uppercase tracking-wide">
              <th className="px-6 py-5 font-semibold text-left">
                <div className="flex items-center gap-2">
                  <User2 size={16} />

                  <span>Étudiant</span>
                </div>
              </th>

              <th className="px-6 py-5 font-semibold text-left">
                <div className="flex items-center gap-2">
                  <GraduationCap size={16} />

                  <span>Formation</span>
                </div>
              </th>

              <th className="px-6 py-5 font-semibold text-left">
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} />

                  <span>Date</span>
                </div>
              </th>

              <th className="px-6 py-5 font-semibold text-left">Statut</th>

              <th className="px-6 py-5 font-semibold text-center">Actions</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody>
            {inscriptions?.map((item, index) => (
              <tr
                key={item._id}
                className="
                    border-b border-slate-100
                    hover:bg-slate-50/80
                    transition-all duration-300
                  ">
                {/* USER */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    {/* AVATAR */}
                    <div
                      className="
                          w-12 h-12 rounded-2xl
                          bg-gradient-to-br from-indigo-500 to-blue-600
                          text-white
                          flex items-center justify-center
                          font-bold
                          shadow-md
                          shrink-0
                        ">
                      {item.firstName?.charAt(0).toUpperCase()}
                    </div>

                    {/* INFO */}
                    <div>
                      <p className="font-semibold text-slate-800">
                        {item.firstName} {item.lastName}
                      </p>

                      <p className="text-sm text-slate-400 mt-1">
                        ID #{item._id?.slice(-6)}
                      </p>
                    </div>
                  </div>
                </td>

                {/* FORMATION */}
                <td className="px-6 py-5">
                  <div
                    className="
      inline-flex items-center
      px-4 py-2
      rounded-xl
      bg-slate-100
      text-slate-700
      text-sm font-medium
    ">
                    {item.formation?.title}
                  </div>
                </td>

                {/* DATE */}
                <td className="px-6 py-5">
                  <span className="text-slate-600 font-medium">
                    {new Date(item.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                </td>

                {/* STATUS */}
                <td className="px-6 py-5">
                  <StatusBadge
                    status={
                      item.personalValidated &&
                      item.formationValidated &&
                      item.documentsValidated &&
                      item.paymentValidated
                        ? "validée"
                        : item.status === "rejetée"
                          ? "rejetée"
                          : "en attente"
                    }
                  />
                </td>

                {/* ACTIONS */}
                <td className="px-6 py-5">
                  <ActionButtons inscription={item} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
