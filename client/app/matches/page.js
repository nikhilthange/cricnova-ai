import { getAllMatches } from "../../services/matchService";
import MatchCard from "../../components/MatchCard";
import PageContainer from "../../components/PageContainer";

export const dynamic = "force-dynamic";

export default async function MatchesPage() {
  let matches = [];
  let error = null;

  try {
    const res = await getAllMatches();
    matches = res.data || [];
  } catch (err) {
    error = err.message;
  }

  return (
    <PageContainer title="All Matches">
      {error && (
        <p className="rounded-lg bg-red-900/40 p-4 text-red-300">
          Failed to fetch matches
        </p>
      )}

      {!error && matches.length === 0 && (
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 text-gray-400">
          No matches found.
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </PageContainer>
  );
}