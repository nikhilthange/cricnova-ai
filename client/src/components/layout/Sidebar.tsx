import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Activity, 
  Calendar, 
  Trophy, 
  Users, 
  User, 
  Table2, 
  TrendingUp, 
  Newspaper 
} from "lucide-react";
import { cn } from "../../lib/utils";

export const navLinks = [
  { name: "Home", path: "/", icon: Home },
  { name: "Live Scores", path: "/live", icon: Activity },
  { name: "Schedule", path: "/schedule", icon: Calendar },
  { name: "Series", path: "/series", icon: Trophy },
  { name: "Teams", path: "/teams", icon: Users },
  { name: "Players", path: "/players", icon: User },
  { name: "Points Table", path: "/points-table", icon: Table2 },
  { name: "Rankings", path: "/rankings", icon: TrendingUp },
  { name: "News", path: "/news", icon: Newspaper },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 fixed inset-y-0 left-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-r border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300">
      <div className="flex h-16 items-center px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl group-hover:rotate-12 transition-transform">
            C
          </div>
          <span className="text-2xl font-bold tracking-tight text-gradient">
            CricNova
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          
          return (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm border border-blue-100 dark:border-blue-800/30"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500")} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="glass-card p-4 rounded-xl text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            &copy; 2026 CricNova AI
          </p>
        </div>
      </div>
    </aside>
  );
}
