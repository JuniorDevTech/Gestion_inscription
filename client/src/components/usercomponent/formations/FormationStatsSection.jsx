import { BookOpen, Users, GraduationCap, Star } from "lucide-react";

import { useMemo } from "react";

import { useSelector } from "react-redux";

import FormationStatsCard from "./FormationStatsCard";

export default function FormationStatsSection() {
  /* ================================================= */
  /* ================= REDUX ========================= */
  /* ================================================= */

  const { formations } = useSelector((state) => state.formations);

  /* ================================================= */
  /* ================= STATS ========================= */
  /* ================================================= */

  const stats = useMemo(() => {
    /* TOTAL FORMATIONS */
    const totalFormations = formations.length;

    /* TOTAL STUDENTS */
    const totalStudents = formations.reduce(
      (total, formation) => total + Number(formation.students || 0),
      0,
    );

    /* CERTIFICATIONS */
    const certifications = totalFormations > 0 ? "100%" : "0%";

    /* RATING */
    const averageRating = formations.length
      ? (
          formations.reduce(
            (total, formation) => total + Number(formation.rating || 4.9),
            0,
          ) / formations.length
        ).toFixed(1)
      : "0.0";

    return {
      totalFormations,

      totalStudents,

      certifications,

      averageRating,
    };
  }, [formations]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {/* FORMATIONS */}
      <FormationStatsCard
        title="Formations"
        value={stats.totalFormations}
        icon={BookOpen}
        color="bg-gradient-to-br from-blue-500 to-cyan-500"
      />

      {/* STUDENTS */}
      <FormationStatsCard
        title="Étudiants"
        value={Number(stats.totalStudents).toLocaleString()}
        icon={Users}
        color="bg-gradient-to-br from-emerald-500 to-green-600"
      />

      {/* CERTIFICATIONS */}
      <FormationStatsCard
        title="Certifications"
        value={stats.certifications}
        icon={GraduationCap}
        color="bg-gradient-to-br from-indigo-500 to-violet-600"
      />

      {/* SATISFACTION */}
      <FormationStatsCard
        title="Satisfaction"
        value={`${stats.averageRating}/5`}
        icon={Star}
        color="bg-gradient-to-br from-amber-400 to-orange-500"
      />
    </div>
  );
}
