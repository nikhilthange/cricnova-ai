import { useState, useEffect } from "react";
import api from "../services/api";
import { Skeleton } from "../components/ui/Skeleton";
import { Card, CardContent } from "../components/ui/Card";
import { Newspaper, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We would fetch from real API here
    // For now we simulate with mock data
    setTimeout(() => {
      setNews([
        { id: 1, title: "Kohli scripts history with 50th ODI century", category: "Milestone", author: "CricNova", date: "2 hrs ago", img: "🏆" },
        { id: 2, title: "Australia announces squad for Ashes series", category: "Team News", author: "CricNova", date: "4 hrs ago", img: "🇦🇺" },
        { id: 3, title: "Bumrah returns to Indian test squad", category: "Injury Update", author: "CricNova", date: "5 hrs ago", img: "🏏" },
        { id: 4, title: "England's aggressive Bazball approach continues", category: "Analysis", author: "CricNova", date: "6 hrs ago", img: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3 text-slate-900 dark:text-white">
          <Newspaper className="text-blue-500 w-8 h-8" /> Cricket News
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Latest articles, trending stories, and in-depth analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(6).fill(0).map((_, i) => <Skeleton key={i} className="h-[300px]" />)
        ) : (
          news.map((item) => (
            <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-all cursor-pointer flex flex-col">
              <div className="h-40 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-6xl">
                {item.img}
              </div>
              <CardContent className="p-6 flex flex-col flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-green-500 mb-2">
                  {item.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-500 transition-colors">
                  {item.title}
                </h3>
                <div className="mt-auto flex items-center justify-between text-sm text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-4">
                  <span>{item.author} • {item.date}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
