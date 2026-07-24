import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { BadgeCheck } from "lucide-react";

import { getMyInscriptions } from "../../../features/inscription/inscriptionService";

export default function UserApprovedFormationCard() {
  const dispatch = useDispatch();

  const { inscriptions } = useSelector((state) => state.inscriptions);

  useEffect(() => {
    dispatch(getMyInscriptions());
  }, [dispatch]);

  const approved =
    inscriptions?.filter(
      (item) =>
        item.personalValidated &&
        item.formationValidated &&
        item.documentsValidated &&
        item.paymentValidated,
    ).length || 0;

  return (
    <div
      className="
        bg-white
        rounded-[28px]
        border border-slate-200
        shadow-sm
        p-6
      ">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-sm">Formations approuvées</p>

          <h2
            className="
              text-4xl
              font-black
              text-slate-800
              mt-3
            ">
            {approved}
          </h2>
        </div>

        <div
          className="
            w-16 h-16
            rounded-2xl
            bg-emerald-500
            text-white
            flex items-center justify-center
          ">
          <BadgeCheck size={30} />
        </div>
      </div>
    </div>
  );
}
