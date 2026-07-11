import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-background-dark dark:bg-slate-950 text-slate-100 transition-colors duration-300">
        <header className="p-4 border-b border-slate-800">Navbar Placeholder</header>
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<div>Home Page Placeholder</div>} />
          </Routes>
        </main>
        <footer className="p-4 border-t border-slate-800 text-center">Footer Placeholder</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
