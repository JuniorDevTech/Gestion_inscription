import { useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import InscriptionFilters from "../../components/inscriptions/InscriptionFilters";

import InscriptionTable from "../../components/inscriptions/InscriptionTable";

import InscriptionHeader from "../../components/inscriptions/inscriptionHeader";

import { getInscriptions } from "../../features/inscription/inscriptionService";

export default function ManageInscriptions() {
  const dispatch = useDispatch();

  /* ================================================= */
  /* ================= SEARCH ======================== */
  /* ================================================= */

  const [search, setSearch] = useState("");

  /* ================================================= */
  /* ================= REDUX ========================= */
  /* ================================================= */

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
  /* ================= FILTER ======================== */
  /* ================================================= */

  const filteredData = useMemo(() => {
    return (
      inscriptions?.filter((item) => {
        const fullName = `${item.firstName} ${item.lastName}`;

        return (
          fullName.toLowerCase().includes(search.toLowerCase()) ||
          item?.formation?.title?.toLowerCase().includes(search.toLowerCase())
        );
      }) || []
    );
  }, [inscriptions, search]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <InscriptionHeader />

      {/* FILTERS */}
      <InscriptionFilters search={search} setSearch={setSearch} />

      {/* LOADING */}
      {loading && (
        <div
          className="
            bg-white
            rounded-[30px]
            border border-slate-200
            p-10
            text-center
            text-slate-500
          ">
          Chargement des inscriptions...
        </div>
      )}

      {/* ERROR */}
      {error && (
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
      )}

      {/* EMPTY */}
      {!loading && !filteredData.length && (
        <div
          className="
              bg-white
              rounded-[30px]
              border border-slate-200
              p-10
              text-center
            ">
          <h2
            className="
                text-2xl
                font-bold
                text-slate-800
              ">
            Aucune inscription
          </h2>

          <p
            className="
                text-slate-500
                mt-3
              ">
            Les inscriptions des étudiants apparaîtront ici.
          </p>
        </div>
      )}

      {/* TABLE */}
      {!!filteredData.length && <InscriptionTable data={filteredData} />}
    </div>
  );
}
