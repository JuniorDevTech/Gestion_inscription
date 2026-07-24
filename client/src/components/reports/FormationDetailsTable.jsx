import { BookOpen, Users, Wallet, TrendingUp } from "lucide-react";

const formations = [
  {
    id: 1,
    name: "React JS",
    students: 120,
    revenue: "2 400 000 FCFA",
    growth: "+12%",
  },

  {
    id: 2,
    name: "Laravel",
    students: 80,
    revenue: "1 600 000 FCFA",
    growth: "+8%",
  },

  {
    id: 3,
    name: "UI/UX Design",
    students: 60,
    revenue: "1 200 000 FCFA",
    growth: "+5%",
  },
];

export default function FormationDetailsTable() {
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
            Détails des formations
          </h2>

          <p className="text-slate-500 mt-1">
            Analyse des performances et revenus des formations
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
          {formations.length} formations actives
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto relative z-10">
        <table className="w-full min-w-[750px]">
          {/* HEAD */}
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-slate-500 text-sm uppercase tracking-wide">
              <th className="px-6 py-5 text-left font-semibold">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} />
                  Formation
                </div>
              </th>

              <th className="px-6 py-5 text-left font-semibold">
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  Étudiants
                </div>
              </th>

              <th className="px-6 py-5 text-left font-semibold">
                <div className="flex items-center gap-2">
                  <Wallet size={16} />
                  Revenus
                </div>
              </th>

              <th className="px-6 py-5 text-left font-semibold">Croissance</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {formations.map((item) => (
              <tr
                key={item.id}
                className="
                  border-b border-slate-100
                  hover:bg-slate-50/80
                  transition-all duration-300
                ">
                {/* FORMATION */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    {/* ICON */}
                    <div
                      className="
                        w-12 h-12 rounded-2xl
                        bg-gradient-to-br from-indigo-600 to-blue-600
                        text-white
                        flex items-center justify-center
                        shadow-md
                        shrink-0
                      ">
                      <BookOpen size={22} />
                    </div>

                    {/* NAME */}
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {item.name}
                      </h3>

                      <p className="text-sm text-slate-400 mt-1">
                        Formation premium
                      </p>
                    </div>
                  </div>
                </td>

                {/* STUDENTS */}
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
                    <Users size={16} />
                    {item.students} étudiants
                  </div>
                </td>

                {/* REVENUE */}
                <td className="px-6 py-5">
                  <span className="font-bold text-emerald-600 text-lg">
                    {item.revenue}
                  </span>
                </td>

                {/* GROWTH */}
                <td className="px-6 py-5">
                  <div
                    className="
                      inline-flex items-center gap-2
                      px-4 py-2
                      rounded-full
                      bg-emerald-50
                      border border-emerald-100
                      text-emerald-700
                      text-sm font-semibold
                    ">
                    <TrendingUp size={16} />

                    {item.growth}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
