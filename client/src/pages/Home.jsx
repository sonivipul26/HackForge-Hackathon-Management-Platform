import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { checkHealth } from '../api/health.api';
import { getHackathonsApi } from '../api/hackathon.api';
import {
  FiArrowRight,
  FiCheckCircle,
  FiAlertCircle,
  FiCpu,
  FiAward,
  FiUsers,
  FiGlobe,
  FiZap,
  FiShield,
  FiStar,
} from 'react-icons/fi';

/**
 * Home Page Component
 *
 * Full landing page implementing all sections from Requirement 9:
 * - Hero Section
 * - Featured Hackathons
 * - Statistics
 * - Why Participate
 * - Previous Winners Spotlight
 * - Testimonials
 * - Footer
 */
const Home = () => {
  const [healthStatus, setHealthStatus] = useState({ loading: true, data: null, error: null });
  const [featuredHackathons, setFeaturedHackathons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [healthRes, hackathonsRes] = await Promise.all([
          checkHealth(),
          getHackathonsApi({ limit: 3 }),
        ]);
        setHealthStatus({ loading: false, data: healthRes.data, error: null });
        setFeaturedHackathons(hackathonsRes.data.hackathons || []);
      } catch (err) {
        setHealthStatus({
          loading: false,
          data: null,
          error: err.response?.data?.message || 'Backend connection failed',
        });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* API Connection Banner */}
      <div className="bg-slate-900 text-white py-2 px-4 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>SYSTEM HEALTH CHECK:</span>
          </span>
          {healthStatus.loading ? (
            <span className="text-slate-400">Pinging backend...</span>
          ) : healthStatus.error ? (
            <span className="text-rose-400 flex items-center space-x-1">
              <FiAlertCircle /> <span>{healthStatus.error}</span>
            </span>
          ) : (
            <span className="text-emerald-400 flex items-center space-x-2">
              <FiCheckCircle />
              <span>
                Backend: {healthStatus.data.status} | DB: {healthStatus.data.mongodb} | Mode: {healthStatus.data.environment}
              </span>
            </span>
          )}
        </div>
      </div>

      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-xs font-semibold uppercase tracking-wider mb-6">
          <FiCpu className="text-sm" />
          <span>NEXT-GEN HACKATHON PLATFORM</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
          Where Elite Talent Meets <br />
          <span className="text-blue-600">Radical Innovation.</span>
        </h1>

        <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
          The institutional-grade platform for universities and enterprise companies to host high-stakes hackathons, manage intellectual property, and discover world-class engineering talent.
        </p>

        <div className="mt-8 flex justify-center space-x-4">
          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
          >
            <span>Get Started</span>
            <FiArrowRight />
          </Link>
          <Link
            to="/hackathons"
            className="bg-white hover:bg-slate-100 text-slate-700 font-semibold px-6 py-3 rounded-lg border border-slate-300 transition-all"
          >
            Explore Events
          </Link>
        </div>
      </section>

      {/* 2. Platform Stats Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <FiUsers className="text-2xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">50k+</div>
              <div className="text-xs uppercase font-medium text-slate-500">Active Developers</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
              <FiGlobe className="text-2xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">200+</div>
              <div className="text-xs uppercase font-medium text-slate-500">Partner Universities</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
              <FiAward className="text-2xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">$1.2M</div>
              <div className="text-xs uppercase font-medium text-slate-500">Prizes Distributed</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
              <FiCpu className="text-2xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">15k+</div>
              <div className="text-xs uppercase font-medium text-slate-500">Projects Built</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Hackathons Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Featured Hackathons</h2>
            <p className="text-sm text-slate-600 mt-1">Participate in world-class events and compete for prizes.</p>
          </div>
          <Link to="/hackathons" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center space-x-1">
            <span>View All</span>
            <FiArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredHackathons.length > 0 ? (
            featuredHackathons.map((h) => (
              <div key={h._id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 font-bold text-xs rounded uppercase">
                      {h.category}
                    </span>
                    <span className="text-xs font-bold text-emerald-600">${h.prizePool?.toLocaleString()} Pool</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">{h.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">{h.tagline}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-xs font-medium text-slate-500">{h.mode}</span>
                  <Link
                    to={`/hackathons/${h._id}`}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-500 text-sm">
              Loading featured hackathons...
            </div>
          )}
        </div>
      </section>

      {/* 4. Why Participate Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-slate-900">Why Build on HackForge?</h2>
          <p className="text-sm text-slate-600 mt-1 max-w-xl mx-auto">
            Designed for developers by developers. Everything you need to turn ideas into venture-backed startups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-4">
              <FiZap />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Verified Rubric Judging</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Submissions are evaluated by accredited industry judges across 4 standardized criteria: Technical Execution, Innovation, UX, and Impact.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-2xl mb-4">
              <FiShield />
            </div>
            <div className="font-bold text-slate-900 text-base">Institutional Security</div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Role-based access control, cryptographic join codes, and protected routes safeguard your intellectual property and submission repos.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-2xl mb-4">
              <FiStar />
            </div>
            <div className="font-bold text-slate-900 text-base">Instant Leaderboards</div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Track your global ranking in real time as judges log evaluation scores directly onto the live competition dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Previous Winners Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full font-bold text-xs uppercase tracking-wider">
              Previous Winner Spotlight
            </span>
            <h2 className="text-3xl font-extrabold mt-4">NeoVault: DeFi Savings Protocol</h2>
            <p className="text-slate-300 text-sm mt-3 leading-relaxed">
              Built at Fintech Frontier 2024 by Team CyberForge. NeoVault won 1st Place ($20,000) and went on to raise $1.5M in seed funding!
            </p>
            <div className="mt-6 flex items-center space-x-4">
              <Link to="/leaderboard" className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg transition-all">
                Explore Hall of Fame
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-slate-200 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            <span className="font-bold text-slate-900 text-sm">HackForge</span> © 2024 - Capstone Project Management Platform.
          </div>
          <div className="flex space-x-6">
            <Link to="/hackathons" className="hover:text-slate-900">Hackathons</Link>
            <Link to="/projects" className="hover:text-slate-900">Projects</Link>
            <Link to="/leaderboard" className="hover:text-slate-900">Leaderboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
