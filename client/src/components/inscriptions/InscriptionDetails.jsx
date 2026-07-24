/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

import PersonalSection from "../inscriptions/componentDetailsUser/section/PersonalSection";

import FormationSection from "../inscriptions/componentDetailsUser/section/FormationSection";

import DocumentsSection from "../inscriptions/componentDetailsUser/section/DocumentsSection";

import PaymentSection from "../inscriptions/componentDetailsUser/section/PaymentSection";

import { getInscriptionById } from "../../features/inscription/inscriptionService";

export default function InscriptionDetails() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  /* ================================================= */
  /* ================= REDUX ========================= */
  /* ================================================= */

  const { inscription, loading, error } = useSelector(
    (state) => state.inscriptions,
  );

  /* ================================================= */
  /* ================= SECTION STATUS ================ */
  /* ================================================= */

  const [sections, setSections] = useState({
    personal: false,

    formation: false,

    documents: false,

    payment: false,
  });

  /* ================================================= */
  /* ================= FETCH ========================= */
  /* ================================================= */

  useEffect(() => {
    if (id) {
      dispatch(getInscriptionById(id));
    }
  }, [dispatch, id]);

  /* ================================================= */
  /* ================= VALIDATION ==================== */
  /* ================================================= */

  const handleSectionValidate = async (section) => {
    try {
      const token = localStorage.getItem("token");

      /* ================================================= */
      /* ================= UPDATE STATUS ================= */
      /* ================================================= */

      const response = await fetch(
        `http://localhost:5000/api/inscriptions/${id}/status`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            status: "validée",

            section,
          }),
        },
      );

      const data = await response.json();

      console.log(data);

      /* ================================================= */
      /* ================= PAYMENT CREATE ================ */
      /* ================================================= */

      if (section === "payment") {
        await fetch(
          `http://localhost:5000/api/dashboard/validate-payment/${id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type": "application/json",

              Authorization: `Bearer ${token}`,
            },
          },
        );
      }

      /* ================================================= */
      /* ================= REFRESH ======================= */
      /* ================================================= */

      dispatch(getInscriptionById(id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSectionReject = async (section) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/inscriptions/${id}/status`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            status: "rejetée",

            section,
          }),
        },
      );

      const data = await response.json();

      console.log(data);

      /* REFRESH */
      dispatch(getInscriptionById(id));
    } catch (error) {
      console.error(error);
    }
  };
  /* ================================================= */
  /* ================= LOADING ======================= */
  /* ================================================= */

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          flex items-center justify-center
          text-slate-500
          text-lg
          font-semibold
        ">
        Chargement du dossier...
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
          min-h-screen
          flex items-center justify-center
          p-6
        ">
        <div
          className="
            bg-red-50
            border border-red-200
            text-red-700
            px-6 py-5
            rounded-3xl
            font-semibold
          ">
          {error}
        </div>
      </div>
    );
  }

  /* ================================================= */
  /* ================= EMPTY ========================= */
  /* ================================================= */

  if (!inscription) {
    return (
      <div
        className="
          min-h-screen
          flex items-center justify-center
          text-slate-500
          text-lg
          font-semibold
        ">
        Aucune inscription trouvée.
      </div>
    );
  }

  const handleFinalValidation = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/inscriptions/${id}/status`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            status: "validée",
          }),
        },
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        navigate("/admin/inscriptions");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-50
        via-white
        to-indigo-50/40
      ">
      {/* ================================================= */}
      {/* ================= CONTAINER ===================== */}
      {/* ================================================= */}

      <div
        className="
          max-w-7xl
          mx-auto
          p-4 sm:p-6 lg:p-8
        ">
        {/* ================================================= */}
        {/* ================= HERO ========================== */}
        {/* ================================================= */}

        <div
          className="
            relative overflow-hidden
            rounded-[36px]
            bg-gradient-to-r
            from-indigo-600
            via-blue-600
            to-cyan-500
            p-6 sm:p-8 lg:p-10
            text-white
            shadow-2xl
          ">
          {/* BLUR EFFECT */}
          <div
            className="
              absolute -top-24 -right-24
              w-96 h-96
              bg-white/10
              rounded-full
              blur-3xl
            "
          />

          {/* CONTENT */}
          <div className="relative z-10">
            <p
              className="
                text-white/80
                uppercase
                tracking-[0.3em]
                text-sm
              ">
              Dossier étudiant
            </p>

            <h1
              className="
                mt-4
                text-4xl sm:text-5xl lg:text-6xl
                font-black
                leading-tight
              ">
              {inscription?.firstName} {inscription?.lastName}
            </h1>

            <p
              className="
                mt-4
                text-lg
                text-white/90
                max-w-2xl
              ">
              Consultation et validation complète du dossier d’inscription
              étudiant.
            </p>

            {/* BADGES */}
            <div
              className="
                mt-8
                flex flex-wrap gap-3
              ">
              <div
                className="
                  px-5 py-3
                  rounded-2xl
                  bg-white/15
                  backdrop-blur-xl
                  text-sm font-bold
                ">
                {inscription?.formation?.title}
              </div>

              <div
                className="
                  px-5 py-3
                  rounded-2xl
                  bg-white/15
                  backdrop-blur-xl
                  text-sm font-bold
                ">
                {inscription?.paymentStatus || "Non défini"}
              </div>

              <div
                className="
                  px-5 py-3
                  rounded-2xl
                  bg-white/15
                  backdrop-blur-xl
                  text-sm font-bold
                ">
                ID : {inscription?._id}
              </div>
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* ================= GRID ========================== */}
        {/* ================================================= */}

        <div
          className="
            mt-8
            grid
            xl:grid-cols-2
            gap-6
          ">
          {/* PERSONAL */}
          <PersonalSection
            inscription={inscription}
            validated={inscription?.personalValidated}
            onValidate={() => handleSectionValidate("personal")}
            onReject={() => handleSectionReject("personal")}
          />

          {/* FORMATION */}
          <FormationSection
            inscription={inscription}
            validated={inscription?.formationValidated}
            onValidate={() => handleSectionValidate("formation")}
            onReject={() => handleSectionReject("formation")}
          />

          {/* DOCUMENTS */}
          <DocumentsSection
            inscription={inscription}
            validated={inscription?.documentsValidated}
            onValidate={() => handleSectionValidate("documents")}
            onReject={() => handleSectionReject("documents")}
          />

          {/* PAYMENT */}
          <PaymentSection
            inscription={inscription}
            validated={inscription?.paymentValidated}
            onValidate={() => handleSectionValidate("payment")}
            onReject={() => handleSectionReject("payment")}
          />
        </div>

        {/* ================================================= */}
        {/* ================= FINAL ACTION ================== */}
        {/* ================================================= */}

        <div className="mt-8">
          <button
            onClick={handleFinalValidation}
            className="
              w-full
              py-5
              rounded-[30px]
              bg-gradient-to-r
              from-indigo-600
              via-blue-600
              to-cyan-500
              text-white
              text-lg
              font-black
              shadow-2xl
              shadow-indigo-300/40
              hover:scale-[1.01]
              active:scale-[0.99]
              transition-all duration-300
            ">
            Validation finale du dossier
          </button>
        </div>
      </div>
    </div>
  );
}
