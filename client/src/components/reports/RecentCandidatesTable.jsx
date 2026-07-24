import {
  Users,
  GraduationCap,
  BadgeCheck,
  Clock3,
  XCircle,
} from "lucide-react";

const candidates = [
  {
    id: 1,
    name: "Jean Dupont",
    formation: "React JS",
    status: "Validé",
  },

  {
    id: 2,
    name: "Marie Claire",
    formation: "Laravel",
    status: "En attente",
  },

  {
    id: 3,
    name: "Koffi Yao",
    formation: "UI/UX",
    status: "Rejeté",
  },
];

export default function RecentCandidatesTable() {
  const getStatus = (status) => {
    switch (status) {
      case "Validé":
        return {
          icon: BadgeCheck,
          className: "bg-emerald-50 text-emerald-700 border border-emerald-100",
        };

      case "En attente":
        return {
          icon: Clock3,
          className: "bg-amber-50 text-amber-700 border border-amber-100",
        };

      case "Rejeté":
        return {
          icon: XCircle,
          className: "bg-red-50 text-red-700 border border-red-100",
        };

      default:
        return {
          icon: Clock3,
          className: "bg-slate-100 text-slate-700 border border-slate-200",
        };
    }
  };

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
          w-60 h-60
          bg-indigo-100/70
          rounded-full
          blur-3xl
        "
      />

      {/* HEADER */}
      <div
        className="
          relative z-10
          p-6
          border-b border-slate-200
          flex flex-col md:flex-row
          md:items-center
          md:justify-between
          gap-4
        ">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Candidats récents
          </h2>

          <p className="text-slate-500 mt-1">
            Dernières candidatures enregistrées
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
          {candidates.length} candidats
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto relative z-10">
        <table className="w-full min-w-[700px]">
          {/* HEAD */}
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-slate-500 text-sm uppercase tracking-wide">
              <th className="px-6 py-5 text-left font-semibold">
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  Candidat
                </div>
              </th>

              <th className="px-6 py-5 text-left font-semibold">
                <div className="flex items-center gap-2">
                  <GraduationCap size={16} />
                  Formation
                </div>
              </th>

              <th className="px-6 py-5 text-left font-semibold">Statut</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {candidates.map((item) => {
              const status = getStatus(item.status);

              const StatusIcon = status.icon;

              return (
                <tr
                  key={item.id}
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
                          bg-gradient-to-br from-indigo-600 to-blue-600
                          text-white
                          flex items-center justify-center
                          font-bold
                          shadow-md
                          shrink-0
                        ">
                        {item.name.charAt(0)}
                      </div>

                      {/* INFO */}
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {item.name}
                        </h3>

                        <p className="text-sm text-slate-400 mt-1">
                          ID #{item.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* FORMATION */}
                  <td className="px-6 py-5">
                    <div
                      className="
                        inline-flex items-center gap-2
                        px-4 py-2
                        rounded-xl
                        bg-slate-100
                        text-slate-700
                        font-medium
                      ">
                      <GraduationCap size={16} />

                      {item.formation}
                    </div>
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-5">
                    <div
                      className={`
                        inline-flex items-center gap-2
                        px-4 py-2
                        rounded-full
                        text-sm font-semibold
                        ${status.className}
                      `}>
                      <StatusIcon size={16} />

                      {item.status}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
