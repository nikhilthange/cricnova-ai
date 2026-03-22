import { getAllTeams } from "../../services/teamService";
import { getAllPlayers } from "../../services/playerService";
import { getAllMatches } from "../../services/matchService";
import DashboardStatCard from "../../components/DashboardStatCard";
import StatusChart from "../../components/StatusChart";
import PageContainer from "../../components/PageContainer";
import { getTopRunScorer, getTopWicketTaker } from "../../lib/homepageStats";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let teams = [];
  let players = [];
  let matches = [];
  let error = null;

  try {
    const [teamRes, playerRes, matchRes] = await Promise.all([
      getAllTeams(),
      getAllPlayers(),
      getAllMatches(),
    ]);

    teams = teamRes.data || [];
    players = playerRes.data || [];
    matches = matchRes.data || [];
  } catch (err) {
    error = err.message;
  }

  const liveMatches = matches.filter((m) => m.status === "LIVE");
  const upcomingMatches = matches.filter((m) => m.status === "UPCOMING");
  const completedMatches = matches.filter((m) => m.status === "COMPLETED");

  const topRunScorer = getTopRunScorer(players);
  const topWicketTaker = getTopWicketTaker(players);

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
            <DashboardStatCard title="Teams" value={teams.length} subtitle="Registered teams" />
            <DashboardStatCard title="Players" value={players.length} subtitle="Tracked players" />
            <DashboardStatCard title="Matches" value={matches.length} subtitle="Total matches" />
            <DashboardStatCard title="Live Matches" value={liveMatches.length} subtitle="Currently live" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <DashboardStatCard title="Upcoming" value={upcomingMatches.length} subtitle="Scheduled matches" />
            <DashboardStatCard title="Completed" value={completedMatches.length} subtitle="Finished matches" />
            <DashboardStatCard
              title="Top Run Scorer"
              value={topRunScorer ? topRunScorer.name : "N/A"}
              subtitle={topRunScorer ? `${topRunScorer.totalRuns} runs` : "No stats yet"}
            />
            <DashboardStatCard
              title="Top Wicket Taker"
              value={topWicketTaker ? topWicketTaker.name : "N/A"}
              subtitle={topWicketTaker ? `${topWicketTaker.totalWickets} wickets` : "No stats yet"}
            />
          </div>

          <StatusChart data={chartData} />
        </div>
      )}
    </PageContainer>
  );
}