import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ArrowUp } from "lucide-react";
import Button from "./components/ui/Button";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import { ErrorBoundary } from "./components/ui/ErrorBoundary";
import { AuthProvider } from "./context/AuthContext";

// Lazy Loaded Pages
const Home = lazy(() => import("./pages/Home"));
const LiveScores = lazy(() => import("./pages/LiveScores"));
const Teams = lazy(() => import("./pages/Teams"));
const Players = lazy(() => import("./pages/Players"));
const MatchCenter = lazy(() => import("./pages/MatchCenter"));
const Schedule = lazy(() => import("./pages/Schedule"));
const PointsTable = lazy(() => import("./pages/PointsTable"));
const Series = lazy(() => import("./pages/Series"));
const News = lazy(() => import("./pages/News"));
const Rankings = lazy(() => import("./pages/Rankings"));
const Videos = lazy(() => import("./pages/Videos"));
const About = lazy(() => import("./pages/About"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

// Loading fallback for Suspense
const PageLoader = () => (
  <div className="flex h-[60vh] items-center justify-center">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

import { QueryProvider } from "./context/QueryProvider";
import { SocketProvider } from "./context/SocketContext";
import { AIChatbot } from "./components/ui/AIChatbot";

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
    <QueryProvider>
      <SocketProvider>
        <AuthProvider>
          <BrowserRouter>
            <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans">
          <Sidebar />
          <div className="flex flex-col flex-1 min-w-0 md:pl-64">
            <Navbar />
            <main className="flex-1">
              <ErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/live" element={<LiveScores />} />
                    <Route path="/matches/:id" element={<MatchCenter />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/series" element={<Series />} />
                    <Route path="/teams" element={<Teams />} />
                    <Route path="/players" element={<Players />} />
                    <Route path="/points-table" element={<PointsTable />} />
                    <Route path="/rankings" element={<Rankings />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/videos" element={<Videos />} />
                    <Route path="/about" element={<About />} />
                    
                    {/* Auth Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route path="*" element={<div className="text-center py-20 text-2xl font-bold">404 Not Found</div>} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </main>
            <Footer />
          </div>

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
          
          {/* AI Chatbot */}
          <AIChatbot />
          
          <ToastContainer
            position="bottom-left"
            autoClose={3000}
            theme="colored"
          />
        </div>
      </BrowserRouter>
    </AuthProvider>
    </SocketProvider>
    </QueryProvider>
  );
}

export default App;
