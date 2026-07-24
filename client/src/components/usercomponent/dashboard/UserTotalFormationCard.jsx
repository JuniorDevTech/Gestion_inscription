import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { BookOpen } from "lucide-react";

import { getMyInscriptions } from "../../../features/inscription/inscriptionService";

export default function UserTotalFormationCard() {
  const dispatch = useDispatch();

  const { inscriptions } = useSelector((state) => state.inscriptions);

  useEffect(() => {
    dispatch(getMyInscriptions());
  }, [dispatch]);

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
          <p className="text-slate-500 text-sm">Mes formations</p>

          <h2
            className="
              text-4xl
              font-black
              text-slate-800
              mt-3
            ">
            {inscriptions?.length || 0}
          </h2>
        </div>

        <div
          className="
            w-16 h-16
            rounded-2xl
            bg-indigo-500
            text-white
            flex items-center justify-center
          ">
          <BookOpen size={30} />
        </div>
      </div>
    </div>
  );
}
