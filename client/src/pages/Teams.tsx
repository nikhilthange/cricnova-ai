import { useState, useEffect } from "react";
import TeamCard from "../components/ui/TeamCard";
import { Shield, Search } from "lucide-react";
import { Skeleton } from "../components/ui/Skeleton";

// Mock data for teams since we don't have a teamService yet
const mockTeams = [
  { id: 1, name: "India", code: "IND", logo: "🇮🇳", ranking: 1, winRate: 72, colorClass: "bg-gradient-to-r from-blue-500 to-blue-800" },
  { id: 2, name: "Australia", code: "AUS", logo: "🇦🇺", ranking: 2, winRate: 68, colorClass: "bg-gradient-to-r from-yellow-400 to-green-600" },
  { id: 3, name: "England", code: "ENG", logo: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", ranking: 3, winRate: 65, colorClass: "bg-gradient-to-r from-red-500 to-red-800" },
  { id: 4, name: "New Zealand", code: "NZ", logo: "🇳🇿", ranking: 4, winRate: 60, colorClass: "bg-gradient-to-r from-black to-slate-800" },
  { id: 5, name: "South Africa", code: "SA", logo: "🇿🇦", ranking: 5, winRate: 58, colorClass: "bg-gradient-to-r from-green-500 to-yellow-500" },
  { id: 6, name: "Pakistan", code: "PAK", logo: "🇵🇰", ranking: 6, winRate: 55, colorClass: "bg-gradient-to-r from-green-600 to-green-900" },
];

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTeams(mockTeams);
      setLoading(false);
    }, 500);
  }, []);

  const filteredTeams = teams.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.code.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3 text-slate-900 dark:text-white">
            <Shield className="text-blue-500 w-8 h-8" /> Teams
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            International cricket teams and rankings. Click the star to add to favorites.
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search teams..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full md:w-64 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          Array(6).fill(0).map((_, i) => <Skeleton key={i} className="h-[250px]" />)
        ) : filteredTeams.length > 0 ? (
          filteredTeams.map(team => <TeamCard key={team.id} team={team} />)
        ) : (
          <div className="col-span-full p-8 text-center text-slate-500">
            No teams found matching "{search}".
          </div>
        )}
      </div>
    </div>
  );
}
