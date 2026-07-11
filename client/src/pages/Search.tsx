import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { Search as SearchIcon, Users, Shield, Trophy } from "lucide-react";

export default function Search() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [results, setResults] = useState({ players: [], teams: [], matches: [] });
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (debouncedQuery.length > 2) {
      setIsSearching(true);
      // Simulate API search
      setTimeout(() => {
        setResults({
          players: debouncedQuery.toLowerCase() === 'virat' ? [{ name: 'Virat Kohli' }] : [],
          teams: debouncedQuery.toLowerCase() === 'ind' ? [{ name: 'India' }] : [],
          matches: [],
        });
        setIsSearching(false);
      }, 800);
    } else {
      setResults({ players: [], teams: [], matches: [] });
    }
  }, [debouncedQuery]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl animate-in fade-in duration-500">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Search CricNova
        </h1>
        <p className="text-slate-500">Find players, teams, series, and matches.</p>
      </div>

      <div className="relative mb-12">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Start typing to search..."
          className="w-full pl-14 pr-6 py-4 text-lg rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        {isSearching && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {(results.players.length > 0 || results.teams.length > 0) && (
        <div className="space-y-8">
          {results.players.length > 0 && (
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
                <Users className="text-blue-500" /> Players
              </h3>
              {results.players.map((p, i) => <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">{p.name}</div>)}
            </div>
          )}
          {results.teams.length > 0 && (
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
                <Shield className="text-green-500" /> Teams
              </h3>
              {results.teams.map((t, i) => <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">{t.name}</div>)}
            </div>
          )}
        </div>
      )}

      {query.length > 2 && !isSearching && Object.values(results).every(arr => arr.length === 0) && (
        <div className="text-center py-12 text-slate-500">
          No results found for "{query}". Try searching for something else.
        </div>
      )}
    </div>
  );
}
