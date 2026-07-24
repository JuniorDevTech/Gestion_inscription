import { useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import Swal from "sweetalert2";

import FormationHeader from "../../components/formations/FormationHeader";

import FormationCard from "../../components/formations/FormationCard";

import AddFormationModal from "../../components/formations/AddFormationModal";

import {
  getFormations,
  deleteFormation,
} from "../../features/formations/formationService";

export default function ManageFormations() {
  const dispatch = useDispatch();

  /* ================================================= */
  /* ================= STATE ========================= */
  /* ================================================= */

  const [openModal, setOpenModal] = useState(false);

  const [selectedFormation, setSelectedFormation] = useState(null);

  const { formations, loading, error } = useSelector(
    (state) => state.formations,
  );

  /* ================================================= */
  /* ================= FETCH ========================= */
  /* ================================================= */

  useEffect(() => {
    dispatch(getFormations());
  }, [dispatch]);

  /* ================================================= */
  /* ================= REMOVE DUPLICATES ============= */
  /* ================================================= */

  const uniqueFormations = useMemo(() => {
    return formations.filter(
      (formation, index, self) =>
        index === self.findIndex((f) => f._id === formation._id),
    );
  }, [formations]);

  /* ================================================= */
  /* ================= DELETE ======================== */
  /* ================================================= */

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Supprimer cette formation ?",

      text: "Cette action est irréversible",

      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#dc2626",

      cancelButtonColor: "#64748b",

      confirmButtonText: "Oui supprimer",

      cancelButtonText: "Annuler",
    });

    if (!result.isConfirmed) return;

    const response = await dispatch(deleteFormation(id));

    if (response.success) {
      Swal.fire({
        icon: "success",

        title: "Succès",

        text: "Formation supprimée avec succès",
      });
    } else {
      Swal.fire({
        icon: "error",

        title: "Erreur",

        text: response.error || "Erreur suppression",
      });
    }
  };

  /* ================================================= */
  /* ================= EDIT ========================== */
  /* ================================================= */

  const handleEdit = (formation) => {
    setSelectedFormation(formation);

    setOpenModal(true);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <FormationHeader
        onAdd={() => {
          setSelectedFormation(null);

          setOpenModal(true);
        }}
      />

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
          Chargement des formations...
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
      {!loading && !uniqueFormations.length && (
        <div
          className="
              bg-white
              rounded-[30px]
              border border-slate-200
              p-10
              text-center
            ">
          <h2 className="text-2xl font-bold text-slate-800">
            Aucune formation
          </h2>

          <p className="text-slate-500 mt-3">
            Commencez par ajouter une nouvelle formation.
          </p>
        </div>
      )}

      {/* GRID */}
      {!!uniqueFormations.length && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {uniqueFormations.map((formation) => (
            <FormationCard
              key={formation._id}
              formation={formation}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}

      {/* MODAL */}
      {openModal && (
        <AddFormationModal
          formation={selectedFormation}
          onClose={() => {
            setOpenModal(false);

            setSelectedFormation(null);
          }}
        />
      )}
    </div>
  );
}
