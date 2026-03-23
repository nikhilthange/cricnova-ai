import { getAllPlayers } from "../../services/playerService";
import {
  getAllMatches,
  getLiveMatches,
  getUpcomingMatches,
} from "../../services/matchService";
import DashboardStatCard from "../../components/DashboardStatCard";
import StatusChart from "../../components/StatusChart";
import PageContainer from "../../components/PageContainer";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let players = [];
  let matches = [];
  let liveMatches = [];
  let upcomingMatches = [];
  let error = null;

  try {
    const [playerRes, matchRes, liveRes, upcomingRes] = await Promise.all([
      getAllPlayers(),
      getAllMatches(),
      getLiveMatches(),
      getUpcomingMatches(),
    ]);

    players = playerRes.data || [];
    matches = matchRes.data || [];
    liveMatches = liveRes.data || [];
    upcomingMatches = upcomingRes.data || [];
  } catch (err) {
    error = err.message;
  }

  const completedMatches = matches.filter(
    (m) => m.status && m.status.toUpperCase() === "COMPLETED"
  );

  const chartData = [
    { name: "LIVE", count: liveMatches.length },
    { name: "UPCOMING", count: upcomingMatches.length },
    { name: "COMPLETED", count: completedMatches.length },
  ];

  return (
    <PageContainer title="Dashboard">
      {error ? (
        <div className="rounded-2xl border border-red-900 bg-red-950/30 p-6 text-red-200">
          Failed to load dashboard data.
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <DashboardStatCard
              title="Players"
              value={players.length}
              subtitle="Tracked players"
            />
            <DashboardStatCard
              title="Matches"
              value={matches.length}
              subtitle="Database matches"
            />
            <DashboardStatCard
              title="Live Matches"
              value={liveMatches.length}
              subtitle="Currently live"
            />
            <DashboardStatCard
              title="Upcoming Matches"
              value={upcomingMatches.length}
              subtitle="Scheduled matches"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <DashboardStatCard
              title="Completed Matches"
              value={completedMatches.length}
              subtitle="Finished matches"
            />
            <DashboardStatCard
              title="Total Match Coverage"
              value={matches.length + liveMatches.length + upcomingMatches.length}
              subtitle="DB + live + upcoming"
            />
          </div>

          <StatusChart data={chartData} />
        </div>
      )}
    </PageContainer>
  );
}