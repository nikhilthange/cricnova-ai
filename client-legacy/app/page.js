import Link from "next/link";
import {
  getAllMatches,
  getLiveMatches,
  getUpcomingMatches,
} from "../services/matchService";
import { getAllPlayers } from "../services/playerService";

import MatchCard from "../components/MatchCard";
import ResultCard from "../components/ResultCard";
import HighlightCard from "../components/HighlightCard";
import HeroStat from "../components/HeroStat";
import SectionHeader from "../components/SectionHeader";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let matches = [];
  let players = [];
  let liveMatches = [];
  let upcomingMatches = [];

  try {
    const [matchRes, playerRes, liveRes, upcomingRes] = await Promise.all([
      getAllMatches(),
      getAllPlayers(),
      getLiveMatches(),
      getUpcomingMatches(),
    ]);

    matches = matchRes.data || [];
    players = playerRes.data || [];
    liveMatches = liveRes.data || [];
    upcomingMatches = upcomingRes.data || [];
  } catch (error) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        <p className="text-red-500">Failed to load homepage data</p>
      </main>
    );
  }

  const featuredMatches = matches.slice(0, 3);
  const recentResults = matches
    .filter((m) => m.status === "COMPLETED")
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="border-b border-gray-900 py-20 text-center">
        <h1 className="text-5xl font-bold">CricNova AI</h1>
        <p className="mt-4 text-gray-400">
          AI-powered cricket analytics platform
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/matches" className="bg-white px-6 py-3 text-black rounded">
            Matches
          </Link>
          <Link href="/players" className="border px-6 py-3 rounded">
            Players
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          <HeroStat label="Players" value={players.length} />
          <HeroStat label="Matches" value={matches.length} />
          <HeroStat label="Live" value={liveMatches.length} />
          <HeroStat label="Upcoming" value={upcomingMatches.length} />
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="p-6">
        <SectionHeader title="Highlights" />
        <div className="grid gap-4 md:grid-cols-4">
          <HighlightCard title="Live Matches" value={liveMatches.length} />
          <HighlightCard title="Upcoming" value={upcomingMatches.length} />
          <HighlightCard title="Completed" value={recentResults.length} />
          <HighlightCard title="Players" value={players.length} />
        </div>
      </section>

      {/* LIVE MATCHES */}
      <section className="p-6">
        <SectionHeader title="Live Matches" />
        <div className="grid gap-4 md:grid-cols-3">
          {liveMatches.length > 0 ? (
            liveMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))
          ) : (
            <p>No live matches</p>
          )}
        </div>
      </section>

      {/* UPCOMING */}
      <section className="p-6">
        <SectionHeader title="Upcoming Matches" />
        <div className="grid gap-4 md:grid-cols-3">
          {upcomingMatches.length > 0 ? (
            upcomingMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))
          ) : (
            <p>No upcoming matches</p>
          )}
        </div>
      </section>

      {/* RESULTS */}
      <section className="p-6 pb-20">
        <SectionHeader title="Recent Results" />
        <div className="grid gap-4 md:grid-cols-3">
          {recentResults.length > 0 ? (
            recentResults.map((match) => (
              <ResultCard key={match.id} match={match} />
            ))
          ) : (
            <p>No results yet</p>
          )}
        </div>
      </section>
    </main>
  );
}