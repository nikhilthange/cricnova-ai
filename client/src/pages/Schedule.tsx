import { useState, useEffect } from "react";
import { Calendar, Filter, Loader2 } from "lucide-react";
import MatchCard from "../components/ui/MatchCard";
import Button from "../components/ui/Button";

// Assuming you have an api setup, otherwise we fetch directly from VITE_API_URL
const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function Schedule() {
  const [activeTab, setActiveTab] = useState("All");
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const tabs = ["All", "T20", "ODI", "Test"];

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const response = await fetch(`${API_URL}/api/matches/upcoming`);
        const data = await response.json();
        setMatches(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch schedule:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUpcoming();
  }, []);

  const filteredMatches = activeTab === "All" 
    ? matches 
    : matches.filter((m: any) => m.format === activeTab);

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3 text-slate-900 dark:text-white">
            <Calendar className="text-blue-500 w-8 h-8" /> Match Schedule
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Stay updated with upcoming matches and series.
          </p>
        </div>
        
        {/* Format Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <Filter className="w-4 h-4 text-slate-400 mr-2 hidden md:block" />
          {tabs.map(tab => (
            <Button 
              key={tab}
              variant={activeTab === tab ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab)}
              className={activeTab === tab ? "bg-blue-600 text-white border-blue-600" : "border-slate-300 dark:border-slate-700"}
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.length > 0 ? (
            filteredMatches.map((match: any) => (
              <MatchCard key={match.id} match={match} />
            ))
          ) : (
            <div className="col-span-full p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <Calendar className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No Matches Found</h3>
              <p className="text-slate-500 dark:text-slate-400">There are no scheduled matches for the selected format.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
