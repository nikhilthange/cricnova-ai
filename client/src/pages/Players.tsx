import { useState, useEffect } from "react";
import { getAllPlayers } from "../services/playerService";
import { Card, CardContent } from "../components/ui/Card";
import { Skeleton } from "../components/ui/Skeleton";
import { Users, Search } from "lucide-react";

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getAllPlayers();
        setPlayers(res || []);
      } catch (error) {
        console.error("Failed to load players", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredPlayers = players.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3 text-slate-900 dark:text-white">
            <Users className="text-blue-500 w-8 h-8" /> Players
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Explore player profiles, stats, and rankings.
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search players..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full md:w-64 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          Array(8).fill(0).map((_, i) => <Skeleton key={i} className="h-[250px]" />)
        ) : filteredPlayers.length > 0 ? (
          filteredPlayers.map(player => (
            <Card key={player.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-4 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                  <span className="text-3xl">👤</span>
                </div>
              </div>
              <CardContent className="pt-14 pb-6 text-center">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{player.name}</h3>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-4">{player.country} • {player.role}</p>
                
                <div className="grid grid-cols-3 gap-2 border-t border-slate-100 dark:border-slate-800 pt-4">
                  <div>
                    <div className="text-xs text-slate-500">Matches</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{player.matches}</div>
                  </div>
                  {player.runs ? (
                    <div>
                      <div className="text-xs text-slate-500">Runs</div>
                      <div className="font-semibold text-slate-900 dark:text-white">{player.runs}</div>
                    </div>
                  ) : null}
                  {player.wickets ? (
                    <div>
                      <div className="text-xs text-slate-500">Wickets</div>
                      <div className="font-semibold text-slate-900 dark:text-white">{player.wickets}</div>
                    </div>
                  ) : null}
                  {player.average ? (
                    <div>
                      <div className="text-xs text-slate-500">Avg</div>
                      <div className="font-semibold text-slate-900 dark:text-white">{player.average}</div>
                    </div>
                  ) : null}
                  {player.economy ? (
                    <div>
                      <div className="text-xs text-slate-500">Econ</div>
                      <div className="font-semibold text-slate-900 dark:text-white">{player.economy}</div>
                    </div>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full p-8 text-center text-slate-500">
            No players found matching "{search}".
          </div>
        )}
      </div>
    </div>
  );
}
