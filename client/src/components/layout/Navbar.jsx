import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

/**
 * Navbar Component
 *
 * Implements the top navigation bar matching the Stitch UI design.
 * Features brand logo, navigation links, global search bar, and auth CTA buttons.
 */
const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Main Nav */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold text-blue-600 tracking-tight flex items-center space-x-2">
            <span>HackForge</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hackathons
            </Link>
            <Link
              to="/projects"
              className={`text-sm font-medium transition-colors ${
                isActive('/projects') ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Projects
            </Link>
            <Link
              to="/leaderboard"
              className={`text-sm font-medium transition-colors ${
                isActive('/leaderboard') ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Leaderboard
            </Link>
            <Link
              to="/rules"
              className={`text-sm font-medium transition-colors ${
                isActive('/rules') ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Rules
            </Link>
          </nav>
        </div>

        {/* Global Search Bar & Actions */}
        <div className="flex items-center space-x-4">
          <div className="relative hidden lg:block w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              placeholder="Search events, projects..."
              className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/login"
              className="text-sm font-semibold text-slate-700 hover:text-blue-600 px-3 py-2 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
