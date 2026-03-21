import Link from "next/link";
import { getAllMatches } from "../services/matchService";
import { getAllTeams } from "../services/teamService";
import { getAllPlayers } from "../services/playerService";

import MatchCard from "../components/MatchCard";
import TeamPreviewCard from "../components/TeamPreviewCard";
import ResultCard from "../components/ResultCard";
import FeaturedPlayerCard from "../components/FeaturedPlayerCard";
import HighlightCard from "../components/HighlightCard";
import HeroStat from "../components/HeroStat";
import SectionHeader from "../components/SectionHeader";

import {
  getTopRunScorer,
  getTopWicketTaker,
} from "../lib/homepageStats";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let matches = [];
  let teams = [];
  let players = [];

  try {
    const [matchRes, teamRes, playerRes] = await Promise.all([
      getAllMatches(),
      getAllTeams(),
      getAllPlayers(),
    ]);

    matches = matchRes.data || [];
    teams = teamRes.data || [];
    players = playerRes.data || [];
  } catch (error) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        <p className="text-red-500">Failed to load homepage data</p>
      </main>
    );
  }

  const featuredMatches = matches.slice(0, 3);
  const recentResults = matches.filter((m) => m.status === "COMPLETED").slice(0, 3);
  const upcomingMatches = matches.filter((m) => m.status === "UPCOMING").slice(0, 3);
  const topTeams = teams.slice(0, 4);

  const topRunScorer = getTopRunScorer(players);
  const topWicketTaker = getTopWicketTaker(players);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden border-b border-gray-900">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 inline-block rounded-full border border-gray-700 px-4 py-1 text-sm text-gray-300">
              AI-powered cricket analytics platform
            </p>

            <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
              CricNova AI
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-300">
              Track matches, teams, players, predictions, innings, and analytics
              in one modern cricket intelligence platform.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/matches"
                className="rounded-xl bg-white px-6 py-3 font-semibold text-black"
              >
                Explore Matches
              </Link>
              <Link
                href="/teams"
                className="rounded-xl border border-white px-6 py-3 font-semibold"
              >
                View Teams
              </Link>
              <Link
                href="/players"
                className="rounded-xl border border-gray-600 px-6 py-3 font-semibold text-gray-300"
              >
                Browse Players
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-4">
            <HeroStat label="Teams" value={teams.length} />
            <HeroStat label="Players" value={players.length} />
            <HeroStat label="Matches" value={matches.length} />
            <HeroStat label="Results" value={recentResults.length} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <SectionHeader
          title="Highlights"
          subtitle="Quick overview of the current platform data."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <HighlightCard
            title="Upcoming Matches"
            value={upcomingMatches.length}
            subtitle="Ready to follow"
          />
          <HighlightCard
            title="Completed Matches"
            value={recentResults.length}
            subtitle="Recent outcomes"
          />
          <HighlightCard
            title="Active Teams"
            value={teams.length}
            subtitle="Across your dataset"
          />
          <HighlightCard
            title="Tracked Players"
            value={players.length}
            subtitle="Performance records"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <SectionHeader
          title="Top Performers"
          subtitle="Calculated from stored player match statistics."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {topRunScorer ? (
            <FeaturedPlayerCard
              player={topRunScorer}
              label={`Top Run Scorer • ${topRunScorer.totalRuns} runs`}
            />
          ) : (
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 text-gray-400">
              No run-scorer data available yet.
            </div>
          )}

          {topWicketTaker ? (
            <FeaturedPlayerCard
              player={topWicketTaker}
              label={`Top Wicket Taker • ${topWicketTaker.totalWickets} wickets`}
            />
          ) : (
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 text-gray-400">
              No wicket data available yet.
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <SectionHeader
          title="Featured Matches"
          subtitle="Latest matches available in your database."
        />
        {featuredMatches.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 text-gray-400">
            No matches available yet.
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <SectionHeader
          title="Recent Results"
          subtitle="Completed matches and their outcomes."
        />
        {recentResults.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentResults.map((match) => (
              <ResultCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 text-gray-400">
            No completed results found.
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <SectionHeader
          title="Top Teams"
          subtitle="Browse quick previews and jump into team pages."
        />
        {topTeams.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {topTeams.map((team) => (
              <TeamPreviewCard key={team.id} team={team} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 text-gray-400">
            No teams available yet.
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 pb-20">
        <div className="rounded-3xl border border-gray-800 bg-gradient-to-r from-gray-900 to-black p-8">
          <SectionHeader
            title="Build the future of cricket intelligence"
            subtitle="CricNova AI combines match pages, teams, players, predictions, score summaries, and analytics in one structured product."
          />
          <div className="flex flex-wrap gap-4">
            <Link
              href="/matches"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-black"
            >
              Go to Matches
            </Link>
            <Link
              href="/players"
              className="rounded-xl border border-gray-500 px-6 py-3 font-semibold text-gray-300"
            >
              Explore Players
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}