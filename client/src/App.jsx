import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';

/**
 * Root Application Component
 *
 * Sets up global layout structure and client-side routing.
 */
function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="*"
            element={
              <div className="max-w-7xl mx-auto px-4 py-24 text-center">
                <h2 className="text-3xl font-bold text-slate-900">Page Coming Soon</h2>
                <p className="mt-2 text-slate-600">This module will be introduced in subsequent phases.</p>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
