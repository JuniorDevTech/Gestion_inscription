/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import Swal from "sweetalert2";

import InscriptionHeader from "../../components/usercomponent/inscription/InscriptionHeader";

import PersonalInfoSection from "../../components/usercomponent/inscription/PersonalInfoSection";

import FormationSection from "../../components/usercomponent/inscription/FormationSection";

import DocumentsSection from "../../components/usercomponent/inscription/DocumentsSection";

import PaymentSection from "../../components/usercomponent/inscription/PaymentSection";

import SubmitSection from "../../components/usercomponent/inscription/SubmitSection";

import { createInscription } from "../../features/inscription/inscriptionService";
import { getFormations } from "../../features/formations/formationService";

export default function UserInscriptionForma() {
  const dispatch = useDispatch();

  /* ================================================= */
  /* ================= REDUX ========================= */
  /* ================================================= */

  const { loading } = useSelector((state) => state.inscriptions);
  const { user } = useSelector((state) => state.auth);
  const { formations } = useSelector((state) => state.formations);

  /* ================================================= */
  /* ================= FORM DATA ===================== */
  /* ================================================= */

  const [formData, setFormData] = useState({
    /* PERSONAL INFOS */
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    sexe: "",
    birthDate: "",
    address: "",

    /* FORMATION */
    formation: "",
    level: "",
    mode: "",
    duration: "",

    /* PAYMENT */
    paymentMethod: "",
    paymentPhone: "",
    paymentReference: "",
    paymentStatus: "en attente",

    /* NOTES */
    notes: "",

    /* FILES */
    photo: null,
    identityCard: null,
    diploma: null,
    cv: null,
  });

  /* ================================================= */
  /* ================= HANDLE CHANGE ================= */
  /* ================================================= */

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  /* ================================================= */
  /* ================= HANDLE FILE =================== */
  /* ================================================= */

  const handleFileChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.files[0],
    });
  };

  /* ================================================= */
  /* ================= HANDLE SUBMIT ================= */
  /* ================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* VALIDATION */
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.formation
    ) {
      return Swal.fire({
        icon: "error",

        title: "Erreur",

        text: "Veuillez remplir tous les champs obligatoires",
      });
    }

    /* PAYMENT VALIDATION */
    if (!formData.paymentMethod || !formData.paymentPhone) {
      return Swal.fire({
        icon: "warning",

        title: "Paiement requis",

        text: "Veuillez sélectionner un mode de paiement",
      });
    }

    try {
      /* ================================================= */
      /* ================= PAYMENT SIMULATION ============ */
      /* ================================================= */

      const finalData = {
        ...formData,

        paymentReference: `PAY-${Math.floor(Math.random() * 999999)}`,

        paymentStatus: "payé",
      };

      /* ================================================= */
      /* ================= FORM DATA ===================== */
      /* ================================================= */

      const inscriptionData = new FormData();

      Object.keys(finalData).forEach((key) => {
        inscriptionData.append(key, finalData[key]);
      });

      /* ================================================= */
      /* ================= API =========================== */
      /* ================================================= */

      const result = await dispatch(createInscription(inscriptionData));

      if (!result.success) {
        throw new Error(result.error);
      }

      /* ================================================= */
      /* ================= SUCCESS ======================= */
      /* ================================================= */

      await Swal.fire({
        icon: "success",

        title: "Paiement confirmé",

        html: `
          <div style="text-align:center">
            <p style="margin-bottom:10px">
              Votre inscription a été envoyée avec succès.
            </p>

            <div
              style="
                background:#EEF2FF;
                color:#4338CA;
                padding:12px;
                border-radius:14px;
                font-weight:700;
              ">
              Référence :
              ${finalData.paymentReference}
            </div>
          </div>
        `,
      });

      /* ================================================= */
      /* ================= RESET ========================= */
      /* ================================================= */

      setFormData({
        /* PERSONAL INFOS */
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        sexe: "",
        birthDate: "",
        address: "",

        /* FORMATION */
        formation: "",
        level: "",
        mode: "",
        duration: "",

        /* PAYMENT */
        paymentMethod: "",
        paymentPhone: "",
        paymentReference: "",
        paymentStatus: "en attente",

        /* NOTES */
        notes: "",

        /* FILES */
        photo: null,
        identityCard: null,
        diploma: null,
        cv: null,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",

        title: "Erreur",

        text: error.message || "Erreur serveur",
      });
    }
  };

  /* ================================================= */
  /* ================= AUTO FILL USER ================ */
  /* ================================================= */

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,

        firstName: user.firstName || "",

        lastName: user.lastName || "",

        email: user.email || "",

        phone: user.phone || "",
      }));
    }
  }, [user]);

  /* ================================================= */
  /* ================= GET FORMATIONS ================ */
  /* ================================================= */

  useEffect(() => {
    dispatch(getFormations());
  }, [dispatch]);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <InscriptionHeader />

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* PERSONAL INFOS */}
        <PersonalInfoSection formData={formData} handleChange={handleChange} />

        {/* FORMATION */}
        <FormationSection formData={formData} handleChange={handleChange} />

        {/* DOCUMENTS */}
        <DocumentsSection
          formData={formData}
          handleFileChange={handleFileChange}
        />

        {/* PAYMENT */}
        <PaymentSection formData={formData} handleChange={handleChange} />

        {/* SUBMIT */}
        <SubmitSection loading={loading} />
      </form>
    </div>
  );
}
