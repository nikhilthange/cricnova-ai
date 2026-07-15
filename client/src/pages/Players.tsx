import { useState, useEffect } from "react";
import { Users, Search, Loader2 } from "lucide-react";
import PlayerCard from "../components/ui/PlayerCard";

const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("Virat Kohli"); // Default search

  useEffect(() => {
    const fetchPlayers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/players?search=${encodeURIComponent(activeSearch)}`);
        const data = await response.json();
        setPlayers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch players:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlayers();
  }, [activeSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveSearch(searchQuery.trim());
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3 text-slate-900 dark:text-white">
            <Users className="text-indigo-500 w-8 h-8" /> Player Search
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Search for your favorite cricket players to view their stats.
          </p>
        </div>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search players (e.g. Dhoni)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
        </form>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {players.length > 0 ? (
            players.map((player: any) => (
              <PlayerCard key={player.id} player={player} />
            ))
          ) : (
            <div className="col-span-full p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <Users className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No Players Found</h3>
              <p className="text-slate-500 dark:text-slate-400">Try searching for a different name like "Rohit Sharma" or "Steve Smith".</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
