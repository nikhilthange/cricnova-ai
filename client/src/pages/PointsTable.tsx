import { useState, useEffect } from "react";
import { Trophy, Loader2 } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function PointsTable() {
  const [standings, setStandings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await fetch(`${API_URL}/api/series/standings`);
        const data = await response.json();
        setStandings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch standings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStandings();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3 text-slate-900 dark:text-white">
          <Trophy className="text-yellow-500 w-8 h-8" /> Points Table
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Current standings for the ongoing tournament.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        </div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-slate-100 dark:bg-slate-900/80 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">Pos</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Team</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-center">M</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-center">W</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-center">L</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-center">T</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-center">NRR</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-center">Pts</th>
                </tr>
              </thead>
              <tbody>
                {standings.length > 0 ? standings.map((row: any, index: number) => (
                  <tr 
                    key={row.code || index} 
                    className={`
                      border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors
                      ${index < 4 ? 'bg-green-50/30 dark:bg-green-900/10' : ''}
                    `}
                  >
                    <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">
                      {row.rank}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white flex items-center gap-3">
                      {row.logo && row.logo.length > 5 ? (
                        <img src={row.logo} alt={row.code} className="w-6 h-6 object-cover rounded-full" />
                      ) : (
                        <span className="text-2xl">{row.logo || "🏏"}</span>
                      )}
                      <span className="hidden sm:inline">{row.team}</span>
                      <span className="sm:hidden">{row.code}</span>
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-slate-600 dark:text-slate-400">{row.matches}</td>
                    <td className="px-6 py-4 text-center font-medium text-green-600 dark:text-green-400">{row.won}</td>
                    <td className="px-6 py-4 text-center font-medium text-red-600 dark:text-red-400">{row.lost}</td>
                    <td className="px-6 py-4 text-center font-medium text-slate-600 dark:text-slate-400">{row.tied}</td>
                    <td className="px-6 py-4 text-center font-medium text-blue-600 dark:text-blue-400">{row.nrr}</td>
                    <td className="px-6 py-4 text-center font-bold text-slate-900 dark:text-white text-base">{row.points}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                      No standings data available for this series at the moment.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      <div className="mt-4 flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50 block"></span>
          Top 4 Qualify for Semi-Finals
        </div>
      </div>
    </div>
  );
}
