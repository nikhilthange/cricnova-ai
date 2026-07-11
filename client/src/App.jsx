import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { ArrowUp } from "lucide-react";
import Button from "./components/ui/Button";

// Pages
import Home from "./pages/Home";
import LiveScores from "./pages/LiveScores";
import Teams from "./pages/Teams";
import Players from "./pages/Players";
import MatchDetails from "./pages/MatchDetails";

// Placeholder pages to ensure routing works for unfinished pages
const Placeholder = ({ title }) => (
  <div className="flex h-[60vh] items-center justify-center animate-in fade-in">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">{title}</h1>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
        This page is under development and will be available in the upcoming release.
      </p>
    </div>
  </div>
);

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-background-dark dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/live" element={<LiveScores />} />
            <Route path="/matches/:id" element={<MatchDetails />} />
            <Route path="/schedule" element={<Placeholder title="Schedule" />} />
            <Route path="/series" element={<Placeholder title="Series" />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/players" element={<Players />} />
            <Route path="/points-table" element={<Placeholder title="Points Table" />} />
            <Route path="/rankings" element={<Placeholder title="Rankings" />} />
            <Route path="/news" element={<Placeholder title="News" />} />
            <Route path="/videos" element={<Placeholder title="Videos" />} />
            <Route path="/search" element={<Placeholder title="Search" />} />
            <Route path="/about" element={<Placeholder title="About" />} />
            <Route path="*" element={<Placeholder title="404 Not Found" />} />
          </Routes>
        </main>
        <Footer />

        {/* Scroll to top button */}
        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            size="icon"
            className="fixed bottom-6 right-6 rounded-full shadow-lg z-50 animate-in fade-in zoom-in"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
        )}
        
        {/* Toast notifications */}
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
