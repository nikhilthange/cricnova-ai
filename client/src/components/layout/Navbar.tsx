import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, Search as SearchIcon } from "lucide-react";
import { useStore } from "../../store/useStore";
import { useDebounce } from "../../hooks/useDebounce";
import { cn } from "../../lib/utils";
import Button from "../ui/Button";
import { navLinks } from "./Sidebar";

const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useStore();
  const location = useLocation();
  
  // Search state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [results, setResults] = useState({ players: [] });
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  // Apply theme class to html element
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Mobile drawer overlay logic
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  // Search logic
  useEffect(() => {
    if (debouncedQuery.length > 2) {
      setIsSearching(true);
      const fetchResults = async () => {
        try {
          const response = await fetch(`${API_URL}/api/players?search=${encodeURIComponent(debouncedQuery)}`);
          const data = await response.json();
          setResults({ players: Array.isArray(data) ? data : [] });
        } catch (error) {
          console.error("Search failed:", error);
          setResults({ players: [] });
        } finally {
          setIsSearching(false);
        }
      };
      fetchResults();
    } else {
      setResults({ players: [] });
    }
  }, [debouncedQuery]);

  useEffect(() => {
    if (!isSearchOpen) {
      setQuery("");
      setResults({ players: [] });
    }
  }, [isSearchOpen]);

  return (
    <div className="relative">
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300 md:hidden",
          scrolled || isSearchOpen
            ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                  C
                </div>
                <span className="text-xl font-bold tracking-tight text-gradient">
                  CricNova
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" aria-label="Search" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                {isSearchOpen ? <X className="h-5 w-5 text-slate-500" /> : <SearchIcon className="h-5 w-5" />}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-slate-700" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Desktop Top Header */}
      <header
        className={cn(
          "sticky top-0 z-30 w-full transition-all duration-300 hidden md:block",
          scrolled || isSearchOpen
            ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-end">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" aria-label="Search" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                {isSearchOpen ? <X className="h-5 w-5 text-slate-500" /> : <SearchIcon className="h-5 w-5" />}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-slate-700" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-xl z-50 animate-in slide-in-from-top-2 p-4">
          <div className="container mx-auto max-w-3xl relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search players..."
              className="w-full pl-12 pr-12 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
            />
            <button 
              onClick={() => { setQuery(""); setIsSearchOpen(false); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Search Results */}
            {isSearching && (
              <div className="mt-4 text-center py-4 text-slate-500">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                Searching...
              </div>
            )}
            
            {!isSearching && results.players.length > 0 && (
              <div className="mt-4 max-h-[60vh] overflow-y-auto custom-scrollbar bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-2 shadow-lg">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-2">Players</h3>
                <div className="space-y-1">
                  {results.players.map((p: any) => (
                    <div key={p.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-colors" onClick={() => setIsSearchOpen(false)}>
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">{p.name}</h4>
                        <p className="text-xs text-slate-500">{p.country} • {p.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {!isSearching && query.length > 2 && results.players.length === 0 && (
              <div className="mt-4 text-center py-8 text-slate-500">
                No results found for "{query}"
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Nav Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-slate-950 animate-in slide-in-from-left shadow-2xl">
            <div className="absolute top-0 right-0 -mr-12 pt-4">
              <button
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white bg-slate-800"
                onClick={() => setIsOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <X className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
            
            <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4 custom-scrollbar">
              <div className="flex flex-shrink-0 items-center px-4 mb-6">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl mr-2">
                  C
                </div>
                <span className="text-xl font-bold tracking-tight text-gradient">
                  CricNova
                </span>
              </div>
              <nav className="px-2 space-y-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={cn(
                        "group flex items-center px-2 py-2.5 text-base font-medium rounded-xl",
                        isActive
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                      )}
                    >
                      <Icon className={cn("mr-4 h-6 w-6 flex-shrink-0", isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400 group-hover:text-slate-500")} aria-hidden="true" />
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
