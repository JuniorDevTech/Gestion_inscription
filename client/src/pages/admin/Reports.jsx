import GlobalStats from "../../components/reports/GlobalStats";

import FormationStatsChart from "../../components/reports/FormationStatsChart";

import InscriptionPieChart from "../../components/reports/InscriptionPieChart";

import RecentUsersTable from "../../components/reports/RecentUsersTable";

export default function Reports() {
  return (
    <div className="space-y-6">
      {/* GLOBAL STATS */}
      <GlobalStats />

      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <FormationStatsChart />

        <InscriptionPieChart />
      </div>

      {/* USERS TABLE */}
      <RecentUsersTable />
    </div>
  );
}
