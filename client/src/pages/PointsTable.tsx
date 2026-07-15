import { Trophy } from "lucide-react";

// Mock data for the points table
const mockPointsTable = [
  { rank: 1, team: "India", code: "IND", logo: "🇮🇳", matches: 5, won: 5, lost: 0, tied: 0, nrr: "+1.353", points: 10 },
  { rank: 2, team: "South Africa", code: "SA", logo: "🇿🇦", matches: 5, won: 4, lost: 1, tied: 0, nrr: "+1.112", points: 8 },
  { rank: 3, team: "Australia", code: "AUS", logo: "🇦🇺", matches: 5, won: 3, lost: 2, tied: 0, nrr: "+0.970", points: 6 },
  { rank: 4, team: "New Zealand", code: "NZ", logo: "🇳🇿", matches: 5, won: 3, lost: 2, tied: 0, nrr: "+0.522", points: 6 },
  { rank: 5, team: "Pakistan", code: "PAK", logo: "🇵🇰", matches: 5, won: 2, lost: 3, tied: 0, nrr: "-0.205", points: 4 },
  { rank: 6, team: "England", code: "ENG", logo: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", matches: 5, won: 1, lost: 4, tied: 0, nrr: "-1.248", points: 2 },
];

export default function PointsTable() {
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
              {mockPointsTable.map((row, index) => (
                <tr 
                  key={row.code} 
                  className={`
                    border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors
                    ${index < 4 ? 'bg-green-50/30 dark:bg-green-900/10' : ''}
                  `}
                >
                  <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">
                    {row.rank}
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white flex items-center gap-3">
                    <span className="text-2xl">{row.logo}</span>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-4 flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50 block"></span>
          Top 4 Qualify for Semi-Finals
        </div>
      </div>
    </div>
  );
}
