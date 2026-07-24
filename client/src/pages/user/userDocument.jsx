import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import SuccessHero from "../../components/usercomponent/document/SuccessHero";

import StatusSection from "../../components/usercomponent/document/StatusSection";

import TimelineCard from "../../components/usercomponent/document/TimelineCard";

import PaymentSuccessCard from "../../components/usercomponent/document/PaymentSuccessCard";

import NextStepCard from "../../components/usercomponent/document/NextStepCard";

import AdminStatusCard from "../../components/usercomponent/document/AdminStatusCard";

import ReceiptCard from "../../components/usercomponent/document/ReceiptCard";

import SupportCard from "../../components/usercomponent/document/SupportCard";

import { getMyInscriptions } from "../../features/inscription/inscriptionService";

export default function InscriptionSuccessPage() {
  /* ================================================= */
  /* ================= REDUX ========================= */
  /* ================================================= */

  const dispatch = useDispatch();

  const { inscriptions, loading, error } = useSelector(
    (state) => state.inscriptions,
  );

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
          min-h-[400px]
          flex items-center justify-center
          text-slate-500
          text-lg font-medium
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

  /* ================================================= */
  /* ================= LAST INSCRIPTION ============== */
  /* ================================================= */

  const inscription = inscriptions?.[0];

  /* ================================================= */
  /* ================= EMPTY ========================= */
  /* ================================================= */

  if (!inscription) {
    return (
      <div
        className="
          min-h-[400px]
          flex items-center justify-center
          text-slate-500
          text-lg font-medium
        ">
        Aucun dossier disponible.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HERO */}
      <SuccessHero inscription={inscription} />

      {/* STATUS */}
      <StatusSection inscription={inscription} />

      {/* CONTENT */}
      <div
        className="
          grid grid-cols-1
          xl:grid-cols-3
          gap-6
        ">
        {/* LEFT */}
        <div className="xl:col-span-2 space-y-6">
          <TimelineCard inscription={inscription} />

          <PaymentSuccessCard inscription={inscription} />

          <NextStepCard inscription={inscription} />
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <AdminStatusCard inscription={inscription} />

          <ReceiptCard inscription={inscription} />

          <SupportCard />
        </div>
      </div>
    </div>
  );
}
