import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getHackathonsApi } from '../api/hackathon.api';
import { FiSearch, FiCalendar, FiUsers, FiGlobe, FiTag, FiClock, FiArrowRight } from 'react-icons/fi';

/**
 * Explore Hackathons Page
 *
 * Displays active and upcoming hackathons with search and filters matching Stitch UI designs.
 */
const Hackathons = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    mode: '',
    status: '',
  });

  const fetchHackathons = async () => {
    setLoading(true);
    try {
      const response = await getHackathonsApi(filters);
      setHackathons(response.data.hackathons);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load hackathons');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHackathons();
  }, [filters.category, filters.mode, filters.status]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchHackathons();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Active Opportunities</h1>
          <p className="mt-1 text-slate-600 text-sm">
            Join global engineering competitions hosted by leading universities and tech enterprises.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="relative lg:col-span-2">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              placeholder="Search by title, technology, or host..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-slate-700"
          >
            <option value="">All Categories</option>
            <option value="Web3 & DeFi">Web3 & DeFi</option>
            <option value="Gen AI">Gen AI</option>
            <option value="Green Tech">Green Tech</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Smart Cities">Smart Cities</option>
          </select>

          <select
            value={filters.mode}
            onChange={(e) => setFilters({ ...filters, mode: e.target.value })}
            className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-slate-700"
          >
            <option value="">All Formats</option>
            <option value="online">Online</option>
            <option value="in-person">In-Person</option>
            <option value="hybrid">Hybrid</option>
          </select>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition-all"
          >
            Filter Events
          </button>
        </form>
      </div>

      {/* Hackathons Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-slate-500 text-sm">Loading competitions...</p>
        </div>
      ) : error ? (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm text-center">
          {error}
        </div>
      ) : hackathons.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-slate-200 text-center">
          <h3 className="text-lg font-bold text-slate-800">No hackathons found</h3>
          <p className="text-slate-500 text-sm mt-1">Try adjusting your search criteria or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hackathons.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Card Header & Banner Mock */}
              <div>
                <div className="h-40 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 relative p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur text-blue-700 font-bold text-xs rounded-full shadow-sm uppercase tracking-wider">
                      {item.mode}
                    </span>
                    <span className="px-2.5 py-1 bg-blue-600 text-white font-semibold text-xs rounded-full shadow-sm">
                      ${item.prizePool.toLocaleString()} Prize
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-blue-200 font-semibold uppercase tracking-wider block">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight line-clamp-1">{item.title}</h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Hosted by {item.organizationName}
                  </p>
                  <p className="text-sm text-slate-600 line-clamp-2 mb-4">{item.tagline}</p>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 pt-3 border-t border-slate-100">
                    <div className="flex items-center space-x-1.5">
                      <FiClock className="text-blue-600" />
                      <span>Starts: {new Date(item.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <FiUsers className="text-blue-600" />
                      <span>{item.participantCount} Joined</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action CTA */}
              <div className="px-5 pb-5 pt-2">
                <Link
                  to={`/hackathons/${item._id}`}
                  className="w-full py-2.5 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 font-semibold text-sm rounded-lg flex items-center justify-center space-x-2 transition-all border border-blue-200 hover:border-transparent"
                >
                  <span>Join Hackathon</span>
                  <FiArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hackathons;
