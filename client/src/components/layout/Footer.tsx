import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                C
              </div>
              <span className="text-xl font-bold tracking-tight text-gradient">
                CricNova
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
              Your ultimate destination for live cricket scores, in-depth analysis, comprehensive statistics, and the latest news from the cricketing world.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-blue-500 transition-colors text-sm font-semibold">
                Twitter
              </a>
              <a href="#" className="text-slate-400 hover:text-pink-500 transition-colors text-sm font-semibold">
                Instagram
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-semibold">
                Github
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/live" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Live Scores</Link></li>
              <li><Link to="/schedule" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Upcoming Matches</Link></li>
              <li><Link to="/series" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Series & Tournaments</Link></li>
              <li><Link to="/news" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Cricket News</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Stats & Rankings</h3>
            <ul className="space-y-3">
              <li><Link to="/rankings" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">ICC Rankings</Link></li>
              <li><Link to="/points-table" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Points Table</Link></li>
              <li><Link to="/players" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Player Profiles</Link></li>
              <li><Link to="/teams" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Team Profiles</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">About Us</Link></li>
              <li><a href="mailto:contact@cricnova.com" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2"><Mail className="h-4 w-4" /> contact@cricnova.com</a></li>
              <li><Link to="/privacy" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            &copy; {currentYear} CricNova AI. All rights reserved.
          </p>
          <div className="flex gap-4">
            <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded">Beta v2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
